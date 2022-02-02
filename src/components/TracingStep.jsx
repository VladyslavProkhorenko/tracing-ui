import React from 'react';
import "./../styles/TracingStep.scss";

const TracingStep = ({ step, active, onSelect }) => {
    return (
        <div className={`tracing-step ${active ? 'active' : ''}`}
             onClick={() => onSelect(step)}
        >
            <div className="tracing-step__name">{ step.name }</div>
        </div>
    );
};

export default TracingStep;