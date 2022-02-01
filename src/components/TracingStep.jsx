import React from 'react';
import "./../styles/TracingStep.scss";

const TracingStep = ({ step, active, onSelect }) => {
    return (
        <div className={`tracing-step ${active ? 'active' : ''}`}
             onClick={() => onSelect(step)}
        >
            <div className="tracing-step__label">{ step.label }</div>
        </div>
    );
};

export default TracingStep;