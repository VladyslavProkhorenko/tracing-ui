import React from 'react';
import "./../styles/TracingTree.scss";
import TracingStep from "./TracingStep";
import TracingStepConnector from "./TracingStepConnector";

const TracingTree = ({ traceItem, activeStep, setActiveStep }) => {    
    return (
        <div className="tracing-tree">
            <div className="tracing-tree__header">Tracing for {traceItem.name}</div>
            <div className="tracing-tree__steps">
                {
                    traceItem.steps.map(
                        (step, index) => <div key={step.id}>
                            <TracingStep step={step}
                                         active={activeStep && activeStep.id === step.id}
                                         onSelect={setActiveStep}/>
                            { index !== traceItem.steps.length - 1 && <TracingStepConnector/> }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default TracingTree;