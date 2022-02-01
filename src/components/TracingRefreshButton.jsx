import React from 'react';
import TracingButton from "./TracingButton";

const TracingRefreshButton = ({ startLoading, stopLoading }) => {
    const refreshPage = () => {
        startLoading(true);
        setTimeout(() => stopLoading(), 3000);
    }
    
    return (
        <TracingButton onClick={refreshPage}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9456 6.00008C12.1544 4.04553 10.2382 2.66675 7.99996 2.66675C5.05444 2.66675 2.66663 5.05456 2.66663 8.00008C2.66663 10.9456 5.05444 13.3334 7.99996 13.3334C10.4851 13.3334 12.5732 11.6337 13.1653 9.33341" stroke="#4E5969" strokeWidth="1.33333"/>
                <path d="M13.3333 2.66675V6.00008H10" stroke="#4E5969" strokeWidth="1.33333"/>
            </svg>
        </TracingButton>
    );
};

export default TracingRefreshButton;