import React from 'react';
import "./../styles/TracingEntity.scss"

const TracingEntity = ({ id, name, active, onSelect }) => {
    return (
        <div className={`tracing-entity ${active ? "active" : ""}`}
             onClick={() => onSelect(id)}
        >{ name }</div>
    );
};

export default TracingEntity;