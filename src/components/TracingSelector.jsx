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
    const [ items, setItems ] = useState([]);
    const [ itemsQuery, setItemsQuery ] = useState('');
    const [ itemsPagesCount, setItemsPagesCount ] = useState(1);
    const [ itemsCurrentPage, setItemsCurrentPage ] = useState(1);

    const onEntitySelect = (entity) => {
        setSelectedEntity(entity)
        setSelectingEntityItem(true);
    }

    const onItemSelect = (item) => {
        TracingQueryService.set('entity', selectedEntity.key);
        TracingQueryService.set('id', item.id);
        setActiveEntity(selectedEntity);
        setActiveItem(item, selectedEntity);
        onHide();
    }

    const resetItems = async () => {
        setItemsQuery('');
        setItemsCurrentPage(1);
        await loadItemsForEntity(1, '');
    }

    const onPageChange = async (page) => {
        setItemsCurrentPage(page);
        await loadItemsForEntity(page, itemsQuery);
    }

    const onSearch = async (query) => {
        setItemsQuery(query);
        setItemsCurrentPage(1);
        await loadItemsForEntity(1, query);
    }

    const loadItemsForEntity = async (page, query) => {
        if (!selectedEntity) return;

        const data = await TracingUIService.loadItemsForEntity(selectedEntity.id, page, query);
        selectedEntity.items = data.items;
        setItems(data.items);
        setItemsPagesCount(data.lastPage);
    }

    useEffect(() => {
        setSelectedEntity(activeEntity);
        setSelectingEntityItem(false);
    }, [ activeEntity ])

    useEffect(async () => {
        await loadItemsForEntity(itemsCurrentPage, itemsQuery);
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
                    <TracingItemsFilter />
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
