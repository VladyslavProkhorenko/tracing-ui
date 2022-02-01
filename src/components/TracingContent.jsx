import React, {useState} from 'react';
import TracingTree from "./TracingTree";
import TracingDetails from "./TracingDetails";
import "./../styles/TracingContent.scss";
import TracingLoader from "./TracingLoader";

const TracingContent = ({ loading, traceItem }) => {
    const [ activeStep, setActiveStep ] = useState('rep_requests_lead');
    
    return (
        <div className="tracing-content">
            <TracingLoader active={loading} />
            {
                !loading && <>
                <TracingTree traceItem={traceItem}
                             activeStep={activeStep}
                             setActiveStep={setActiveStep}
                />
                <TracingDetails steps={traceItem.steps}
                                activeStep={activeStep}
                />
                </>
            }
        </div>
    );
};

export default TracingContent;