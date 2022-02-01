import React, {useState} from 'react';
import TracingHeader from "./TracingHeader";
import TracingContent from "./TracingContent";
import "./../styles/TracingUI.scss";
import TracingSelector from "./TracingSelector";

const TracingUI = () => {
    const [ selectorVisible, setSelectorVisibility ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ traceItem, setTraceItem ] = useState({
        id: 0,
        steps : [
            { id: 'rep_requests_lead', label: 'Rep requests lead', datetime: '23:52:02 02.01.2022' },
            { id: 'lb_finds_next_best_lead', label: 'Lead Buffer finds next best lead', datetime: '23:52:02 02.01.2022' },
            { id: 'match_buyer', label: 'Match Buyer', datetime: '23:52:02 02.01.2022' },
            { id: 'buyer_matched', label: 'Buyer Matched', datetime: '23:52:02 02.01.2022' },
            { id: 'overflow_buyer_matched', label: 'Overflow buyer matched', datetime: '23:52:02 02.01.2022' },
            { id: 'rep_calls_lead', label: 'Rep calls lead', datetime: '23:52:02 02.01.2022' },
            { id: 'lead_ready_to_transfer', label: 'Lead Ready To Transfer', datetime: '23:52:02 02.01.2022' },
            { id: 'rep_updates_disposition', label: 'Rep updates disposition', datetime: '23:52:02 02.01.2022' },
            { id: 'transfer_to_raw_as_inbound', label: 'Transfer to Raw as Inbound', datetime: '23:52:02 02.01.2022' },
            { id: 'buyer_still_available', label: 'Buyer still available', datetime: '23:52:02 02.01.2022' },
            { id: 'transfer_to_buyer', label: 'Transfer to buyer', datetime: '23:52:02 02.01.2022' }
        ]
    });
    
    const hideSelector = () => setSelectorVisibility(false);
    const toggleSelector = () => setSelectorVisibility(!selectorVisible);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    const loadTraceItem = (id) => {
        startLoading();
        setTraceItem({
            ...traceItem,
            id
        });
        setTimeout(() => stopLoading(), 3000);
    }
    
    return (
        <div className={`tracing-ui ${selectorVisible ? "selector-visible" : ""}`}>
            <TracingHeader onSelectorToggle={toggleSelector}
                           startLoading={startLoading}
                           stopLoading={stopLoading}
                           onLoadTraceItem={loadTraceItem}
            />
            <TracingSelector status={selectorVisible}
                             onHide={hideSelector}
                             startLoading={startLoading}
                             stopLoading={stopLoading}
            />
            <TracingContent loading={loading}
                            traceItem={traceItem}
            />
            <div className="backdrop" onClick={hideSelector}/>
        </div>
    );
};

export default TracingUI;