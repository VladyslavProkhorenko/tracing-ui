import React from 'react';
import "./../styles/TracingEntity.scss"

const TracingEntity = ({ entity, active, onSelect }) => {
    return (
        <div className={`tracing-entity ${active ? "active" : ""}`}
             onClick={() => onSelect(entity)}
        >{ entity.name }</div>
    );
};

export default TracingEntity;