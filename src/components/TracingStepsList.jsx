import React, { useState } from 'react';
import "./../styles/TracingStepsList.scss";

const TracingStepsList = () => {
    const [ selectedSteps, setSelectedSteps ] = useState([ ]);
    const steps = [
        {
            id: 1,
            name : "Forward to BVL 1",
        },
        {
            id: 2,
            name : "Forward to BVL 2",
        },
        {
            id: 3,
            name : "Forward to BVL 3",
        },
        {
            id: 4,
            name : "Forward to BVL 4",
        },
        {
            id: 5,
            name : "Forward to BVL 5",
        },
        {
            id: 6,
            name : "Forward to BVL 6",
        },
        {
            id: 7,
            name : "Forward to BVL 7",
        },
        {
            id: 8,
            name : "Forward to BVL 8",
        },
        {
            id: 9,
            name : "Forward to BVL 9",
        },
        {
            id: 10,
            name : "Forward to BVL 10",
        },
    ];
    const onSelect = id => {
        const stepIndex = findStepInActivated(id);
        console.log(stepIndex);
        if (stepIndex !== -1) {
            const newSelectedSteps = [ ...selectedSteps ];
            newSelectedSteps.splice(stepIndex, 1);
            setSelectedSteps(newSelectedSteps);
        } else {
            setSelectedSteps([
                ...selectedSteps,
                id
            ]);
        }
    }

    const isActiveStep = id => {
        return findStepInActivated(id) !== -1;
    }

    const findStepInActivated = id => {
        return selectedSteps.findIndex( stepId => stepId === id)
    }

    return (
        <div className="tracing-steps-list">
            {
                steps.map( step =>
                    <div className={`tracing-step-item ${isActiveStep(step.id) ? 'active' : ''}`}
                         key={step.id}
                         onClick={ () => onSelect(step.id) }
                    >
                        { step.name }
                    </div>
                )
            }
        </div>
    );
};

export default TracingStepsList;
