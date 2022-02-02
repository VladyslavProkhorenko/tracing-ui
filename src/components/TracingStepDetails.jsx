import React, { useEffect } from 'react';
import "./../styles/TracingStepDetails.scss";

const TracingStepDetails = ({ activeStep }) => {
    useEffect(() => {
        console.log('activeStep', activeStep);
    }, [ activeStep ]);

    return (
        <div className="tracing-step-details">
            {
                activeStep && Object.keys(activeStep).length
                    ?
                <pre>
                    {JSON.stringify(activeStep,null,2)}
                </pre>
                    :
                <div className="tracing-step-details__empty">Select step</div>
            }
        </div>
    );
};

export default TracingStepDetails;