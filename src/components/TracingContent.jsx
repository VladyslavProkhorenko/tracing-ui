import React, {useState} from 'react';
import TracingTree from "./TracingTree";
import TracingDetails from "./TracingDetails";
import "./../styles/TracingContent.scss";
import TracingLoader from "./TracingLoader";

const TracingContent = ({ loading, traceItem }) => {
    const [ activeStep, setActiveStep ] = useState();
    
    return (
        <div className="tracing-content">
            <TracingLoader active={loading} />
            {
                !loading && <>
                    {
                        traceItem && <>
                        <TracingTree traceItem={traceItem}
                                     activeStep={activeStep}
                                     setActiveStep={setActiveStep}
                        />
                        <TracingDetails steps={traceItem.steps}
                                        activeStep={activeStep}
                        />
                        </>
                    }
                    {
                        !traceItem &&
                        <div className="tracing-content__empty-trace-item">
                            Select trace item...
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default TracingContent;