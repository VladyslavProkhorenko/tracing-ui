import React from 'react';
import TracingRefreshButton from "./TracingRefreshButton";
import TracingName from "./TracingName";
import "./../styles/TracingHeader.scss";
import TracingButton from "./TracingButton";

const TracingHeader = ({ server, activeEntity, setActiveEntity, onSelectorToggle, onRefresh, onServerChange }) => {
    return (
        <div className="tracing-header">
            <div className="tracing-header__controls">
                <TracingButton className="tracing-header__toggle"
                               onClick={onSelectorToggle}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6.76471H15.5V11.5294H2V6.76471ZM15.1029 2H2.39706C2.17777 2 2 2.17777 2 2.39706V6.76471H15.5V2.39706C15.5 2.17777 15.3222 2 15.1029 2ZM2 11.5294H15.5V15.8971C15.5 16.1164 15.3222 16.2941 15.1029 16.2941H2.39706C2.17777 16.2941 2 16.1164 2 15.8971V11.5294Z" stroke="#4E5969" strokeWidth="1.3"/>
                        <path d="M4.8825 13.5H4.875V13.5075H4.8825V13.5Z" stroke="#4E5969" strokeWidth="1.5"/>
                        <path d="M4.875 4.5V3.75H4.125V4.5H4.875ZM4.8825 4.5H5.6325V3.75H4.8825V4.5ZM4.8825 4.5075V5.2575H5.6325V4.5075H4.8825ZM4.875 4.5075H4.125V5.2575H4.875V4.5075ZM4.875 5.25H4.8825V3.75H4.875V5.25ZM4.1325 4.5V4.5075H5.6325V4.5H4.1325ZM4.8825 3.7575H4.875V5.2575H4.8825V3.7575ZM5.625 4.5075V4.5H4.125V4.5075H5.625Z" fill="#4E5969"/>
                        <path d="M4.8825 9H4.875V9.0075H4.8825V9Z" stroke="#4E5969" strokeWidth="1.5"/>
                    </svg>
                </TracingButton>
                {activeEntity && <TracingName activeEntity={activeEntity}
                             setActiveEntity={setActiveEntity}
                />}
            </div>
            <div>Server: <span className="tracing__server">{ server.replace(/[\/]+/, "") }</span></div>
            <div className="tracing-header__buttons">
                <TracingRefreshButton onRefresh={onRefresh} />
                <TracingButton onClick={onServerChange}>Change server</TracingButton>
            </div>            
        </div>
    );
};

export default TracingHeader;
