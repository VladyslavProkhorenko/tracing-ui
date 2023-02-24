import React, { useEffect, useState } from 'react';
import TracingEntity from "./TracingEntity";
import "./../styles/TracingSelector.scss"
import TracingButton from "./TracingButton";
import TracingSearchItems from "./TracingSearchItems";
import TracingPagination from "./TracingPagination";
import TracingUIService from "../services/TracingUI.service";
import TracingQueryService from "../services/TracingQuery.service";
import TracingItemsFilter from "./TracingItemsFilter";

const TracingSelector = ({
                             status, onHide,
                             activeEntity, setActiveEntity,
                             activeItem, setActiveItem,
                             entities, fetchDetailedItemsFromQuery
                         }) => {

    const [ selectedEntity, setSelectedEntity ] = useState(activeEntity);
    const [ selectingEntityItem, setSelectingEntityItem ] = useState(false);
    const [ entitySteps, setEntitySteps ] = useState([]);
    const [ items, setItems ] = useState([]);
    const [ itemsQuery, setItemsQuery ] = useState('');
    const [ itemsPagesCount, setItemsPagesCount ] = useState(1);
    const [ itemsCurrentPage, setItemsCurrentPage ] = useState(1);
    const [ filterType, setFilterType ] = useState('all');
    const [ filterSteps, setFilterSteps ] = useState([]);

    const onEntitySelect = (entity) => {
        setSelectedEntity(entity)
        setSelectingEntityItem(true);
    }

    const onItemSelect = (item) => {
        TracingQueryService.set('entity', selectedEntity.key);
        TracingQueryService.set('id', item.id);
        TracingQueryService.set('externalId', item.name)
        setActiveEntity(selectedEntity);
        setActiveItem(item, selectedEntity);
        onHide();
    }

    const resetItems = async () => {
        setItemsQuery('');
        setItemsCurrentPage(1);
        await loadItemsForEntity(1, '', filterType, filterSteps);
    }

    const onPageChange = async (page) => {
        setItemsCurrentPage(page);
        await loadItemsForEntity(page, itemsQuery, filterType, filterSteps);
    }

    const onSearch = async (query) => {
        setItemsQuery(query);
        setItemsCurrentPage(1);
        await loadItemsForEntity(1, query, filterType, filterSteps);
    }

    const loadItemsForEntity = async (page, query, filterType, filterSteps, externalId) => {
        if (!selectedEntity) return;

        const data = await TracingUIService.loadItemsForEntity(selectedEntity.id, page, query, filterType, filterSteps, externalId);
        selectedEntity.items = data.items;
        setItems(data.items);
        setItemsPagesCount(data.lastPage);
        
        return selectedEntity.items;
    }

    const loadStepsForEntity = async () => {
        const steps = selectedEntity
            ? await TracingUIService.loadStepsForEntity(selectedEntity.id)
            : [];

        setEntitySteps(steps);
    }

    const loadStepForEntity = async (id) => {
        return await TracingUIService.loadItemDetails(id);
    }

    const filterItems = async (type, steps) => {
        if (type === 'all') {
            steps = [];
        }

        setFilterType(type);
        setFilterSteps(steps);
        setItemsCurrentPage(1);
        await loadItemsForEntity(1, itemsQuery, type, steps);
    }

    const mapItemForSteps = async (items) => {
        const newItems = [];

        if (!items) return null;

        for await (let item of items) {
            const step = await loadStepForEntity(item.id)

            if (!step) continue;
            
            newItems.push({ ...item, steps: step.steps });
 
        }

        return newItems;
    }


    useEffect(() => {
        setSelectedEntity(activeEntity);
        setSelectingEntityItem(false);
    }, [ activeEntity ])

    useEffect(async () => {
        setFilterType('all');
        setFilterSteps([]);        
        const externalId = TracingQueryService.get('externalId');
        let items = await loadItemsForEntity(itemsCurrentPage, itemsQuery, 'all', [], externalId);
        
        if (!!(await mapItemForSteps(items))) await fetchDetailedItemsFromQuery(items)
        
        await loadStepsForEntity();
    }, [ selectedEntity ]);
    
    return (
        <div className={`tracing-selector ${status ? "opened" : ""}`}>
            <div className="tracing-selector__header">
                <div className="tracing-selector__header__name">
                    {selectingEntityItem && selectedEntity ? selectedEntity.name : "Traces"}
                </div>
                {
                    selectingEntityItem &&
                    <TracingButton onClick={() => setSelectingEntityItem(false)}>Back</TracingButton>
                }
            </div>
            { !selectingEntityItem && entities.map(
                entity => <TracingEntity entity={entity}
                                         key={entity.id}
                                         active={activeEntity && entity.id === activeEntity.id}
                                         onSelect={onEntitySelect}
                />  
            ) }
            {
                selectingEntityItem && selectedEntity &&
                <>
                    <TracingSearchItems defaultQuery={itemsQuery}
                                        onSearch={onSearch}
                                        onReset={resetItems}
                    />
                    <TracingItemsFilter entitySteps={entitySteps}
                                        onFilter={filterItems}
                    />
                    {
                        Array.isArray(items) && items.length > 0 && <>
                            <div className="tracing-items__wrapper">
                                {
                                    items.map(
                                        item => <TracingEntity entity={item}
                                                               key={item.id}
                                                               active={activeItem && item.id === activeItem.id}
                                                               onSelect={onItemSelect}
                                        />
                                    )
                                }
                            </div>
                            <TracingPagination pagesCount={itemsPagesCount}
                                               currentPage={itemsCurrentPage}
                                               onPageChange={onPageChange}
                            />
                        </>
                    }
                </>
            }
            {
                (!entities || !entities.length || (
                    selectingEntityItem && selectedEntity && (
                        !items || !items.length
                    )
                )) && <div className="tracing-selector__empty-list">
                No items in this entity...
                </div>
            }
        </div>
    );
};

export default TracingSelector;
