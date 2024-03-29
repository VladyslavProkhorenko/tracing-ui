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
                             entities
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
        TracingQueryService.set('key', item.key);
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

    const loadItemsForEntity = async (page, query, filterType, filterSteps) => {
        if (!selectedEntity) return;

        const data = await TracingUIService.loadItemsForEntity(selectedEntity.id, page, query, filterType, filterSteps);
        selectedEntity.items = data.items;
        setItems(data.items);
        setItemsPagesCount(data.lastPage);
    }

    const loadStepsForEntity = async () => {
        const steps = selectedEntity
            ? await TracingUIService.loadStepsForEntity(selectedEntity.id)
            : [];

        setEntitySteps(steps);
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

    useEffect(() => {
        setSelectedEntity(activeEntity);
        setSelectingEntityItem(false);
    }, [ activeEntity ])

    useEffect(async () => {
        setFilterType('all');
        setFilterSteps([]);
        await loadItemsForEntity(itemsCurrentPage, itemsQuery, 'all', []);
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
                                                               key={item.key}
                                                               active={activeItem && item.key === activeItem.key}
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
