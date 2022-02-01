import React, {useEffect, useState} from 'react';
import TracingHeader from "./TracingHeader";
import TracingContent from "./TracingContent";
import "./../styles/TracingUI.scss";
import TracingSelector from "./TracingSelector";
import TracingButton from "./TracingButton";

const TracingUI = () => {
    const [ selectorVisible, setSelectorVisibility ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, [])
    
    const hideSelector = () => setSelectorVisibility(false);
    const toggleSelector = () => setSelectorVisibility(!selectorVisible);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    
    return (
        <div className={`tracing-ui ${selectorVisible ? "selector-visible" : ""}`}>
            <TracingHeader onSelectorToggle={toggleSelector}
                           startLoading={startLoading}
                           stopLoading={stopLoading}
            />
            <TracingSelector status={selectorVisible}
                             onHide={hideSelector}
                             startLoading={startLoading}
                             stopLoading={stopLoading}
            />
            <TracingContent loading={loading}/>
            <div className="backdrop" onClick={hideSelector}/>
        </div>
    );
};

export default TracingUI;