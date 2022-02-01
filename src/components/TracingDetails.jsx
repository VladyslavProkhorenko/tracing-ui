import React, {useState} from 'react';
import "./../styles/TracingDetails.scss";
import TracingTabHeader from "./TracingTabHeader";
import TracingStepDetails from "./TracingStepDetails";
import TracingTraceTimeline from "./TracingTraceTimeline";

const TracingDetails = ({ steps, activeStep }) => {
    const [ activeTab, setActiveTab ] = useState('step_details');
    
    return (
        <div className="tracing-details">
            <div className="tracing-tabs">
                <TracingTabHeader name="Step details"
                                  key="step_details"
                                  active={activeTab === 'step_details'}
                                  onSelect={() => setActiveTab('step_details')}
                />
                <TracingTabHeader name="Trace timeline"
                                  key="trace_timeline"
                                  active={activeTab === 'trace_timeline'}
                                  onSelect={() => setActiveTab('trace_timeline')}
                />
            </div>
            <div className="tracing-tabs-content">
                {activeTab === 'step_details' && <TracingStepDetails activeStep={activeStep} />}
                {activeTab === 'trace_timeline' && <TracingTraceTimeline steps={steps} />}
            </div>
        </div>
    );
};

export default TracingDetails;