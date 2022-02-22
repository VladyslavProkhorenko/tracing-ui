import React  from 'react';
import "./../styles/TracingStepsList.scss";

const TracingStepsList = ({ entitySteps, selectedSteps, onSelect }) => {
    const isActiveStep = name => {
        return selectedSteps.findIndex( step => step === name) !== -1;
    }

    return (
        <div className="tracing-steps-list">
            {
                entitySteps.map( step =>
                    <div className={`tracing-step-item ${isActiveStep(step.name) ? 'active' : ''}`}
                         key={step.name}
                         onClick={ () => onSelect(step.name) }
                    >
                        { step.name }
                    </div>
                )
            }
        </div>
    );
};

export default TracingStepsList;
