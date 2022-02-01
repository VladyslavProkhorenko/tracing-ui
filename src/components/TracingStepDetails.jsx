import React from 'react';
import "./../styles/TracingStepDetails.scss";

const TracingStepDetails = ({ activeStep }) => {
    return (
        <div className="tracing-step-details">
            <pre>
                {JSON.stringify(activeStep,null,2)}
            </pre>
        </div>
    );
};

export default TracingStepDetails;