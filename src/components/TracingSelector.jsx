import React, {useState} from 'react';
import TracingEntity from "./TracingEntity";
import "./../styles/TracingSelector.scss"

const TracingSelector = ({ status, onHide, startLoading, stopLoading }) => {
    const entities = [
        {
            id: 1,
            name: "Leads tracing entity"
        },
        {
            id: 2,
            name: "Calls tracing entity"
        },
        {
            id: 3,
            name: "Companies tracing entity"
        },
        {
            id: 4,
            name: "Reps tracing entity"
        },
        {
            id: 5,
            name: "Users tracing entity"
        },
    ];
    
    const [ activeEntity, setActiveEntity ] = useState(1);
    const onEntitySelect = (id) => {
        setActiveEntity(id);
        onHide();
        startLoading();
        setTimeout(() => {
            stopLoading()
        }, 3000);
    }
    
    
    return (
        <div className={`tracing-selector ${status ? "opened" : ""}`}>
            <div className="tracing-selector__header">Traces</div>
            { entities.map(
                entity => <TracingEntity id={entity.id}
                                         key={entity.id}
                                         name={entity.name}
                                         active={entity.id === activeEntity}
                                         onSelect={onEntitySelect}
                />  
            ) }
        </div>
    );
};

export default TracingSelector;