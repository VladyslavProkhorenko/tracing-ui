import React from 'react';
import "./../styles/TracingName.scss";

const TracingName = ({ activeEntity, setActiveEntity }) => {
    
    return (
        <div className="tracing-name">
            <div className="tracing-name__title">{ activeEntity.name }</div>
        </div>
    );
};

export default TracingName;