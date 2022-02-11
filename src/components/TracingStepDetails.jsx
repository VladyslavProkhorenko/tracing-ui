import React, { useEffect } from 'react';
import "./../styles/TracingStepDetails.scss";

const TracingStepDetails = ({ activeStep }) => {
    return (
        <div className="tracing-step-details">
            {
                activeStep
                    ?
                    <>
                        {
                            activeStep.data && Object.keys(activeStep.data).length ?
                                <pre>
                                    {JSON.stringify(activeStep.data,null,2)}
                                </pre>
                            :
                                <div className="tracing-step-details__empty">No data</div>
                        }
                    </>
                    :
                <div className="tracing-step-details__empty">Select step</div>
            }
        </div>
    );
};

export default TracingStepDetails;
