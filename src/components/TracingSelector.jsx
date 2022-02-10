import React, { useEffect, useState } from 'react';
import TracingEntity from "./TracingEntity";
import "./../styles/TracingSelector.scss"
import TracingButton from "./TracingButton";
import TracingSearchItems from "./TracingSearchItems";
import TracingPagination from "./TracingPagination";

const TracingSelector = ({
                             status, onHide,
                             activeEntity, setActiveEntity,
                             activeItem, setActiveItem,
                             entities
                         }) => {

    const [ selectedEntity, setSelectedEntity ] = useState(activeEntity);
    const [ selectingEntityItem, setSelectingEntityItem ] = useState(false);
    const [ items, setItems ] = useState([]);
    const [ itemsPagesCount, setItemsPagesCount ] = useState(23);
    const [ itemsCurrentPage, setItemsCurrentPage ] = useState(22);

    const onEntitySelect = (entity) => {
        setSelectedEntity(entity)
        setSelectingEntityItem(true);
    }

    const onItemSelect = (item) => {
        setActiveEntity(selectedEntity);
        setActiveItem(item, selectedEntity);
        onHide();
    }

    const resetItems = () => {
        setItems(selectedEntity.items);
    }

    const onPageChange = (page) => {
        setItemsCurrentPage(page);
    }

    useEffect(() => {
        setSelectedEntity(activeEntity);
        setSelectingEntityItem(false);
    }, [ activeEntity ])

    useEffect(() => {
        if (selectedEntity && selectedEntity.items) {
            setItems(selectedEntity.items);
        }
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
                selectingEntityItem && selectedEntity && Array.isArray(items) &&
                <>
                    <TracingSearchItems entityId={selectedEntity.id}
                                        onSearch={setItems}
                                        onReset={resetItems}
                    />
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
