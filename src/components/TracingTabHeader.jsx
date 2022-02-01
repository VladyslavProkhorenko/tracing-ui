import React from 'react';
import "./../styles/TracingTabHeader.scss"

const TracingTabHeader = ({ name, active, onSelect }) => {
    return (
        <div className={`tracing-tab-header ${active ? "active" : ""}`}
             onClick={onSelect}
        >
            { name }
        </div>
    );
};

export default TracingTabHeader;