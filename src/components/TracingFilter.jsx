import React from 'react';
import "./../styles/TracingFilter.scss"
import TracingDropdown from "./TracingDropdown";

const TracingFilter = ({ onLoadTraceItem }) => {
    return (
        <div className="tracing-filter">
            <TracingDropdown onChange={onLoadTraceItem} />
        </div>
    );
};

export default TracingFilter;