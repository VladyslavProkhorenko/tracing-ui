import React from 'react';
import TracingButton from "./TracingButton";
import "./../styles/TracingFilter.scss"

const TracingFilter = ({ startLoading, stopLoading }) => {
    const toPrevDate = () => {
        startLoading(true);
        setTimeout(() => stopLoading(), 3000);
    }

    const toNextDate = () => {
        startLoading(true);
        setTimeout(() => stopLoading(), 3000);
    }

    const onDateChange = () => {
        startLoading(true);
        setTimeout(() => stopLoading(), 3000);
    }
    
    return (
        <div className="tracing-filter">
            <TracingButton onClick={toPrevDate}>
                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.89805 1.15918C5.09332 1.35444 5.09332 1.67102 4.89805 1.86629L2.71795 4.04639L4.83558 6.16402C5.03084 6.35929 5.03084 6.67587 4.83558 6.87113L4.48203 7.22468C4.28677 7.41995 3.97018 7.41995 3.77492 7.22468L0.946495 4.39626C0.751233 4.201 0.751233 3.88441 0.946495 3.68915L1.30005 3.3356C1.31745 3.31819 1.33582 3.30234 1.35498 3.28804L3.83739 0.805626C4.03266 0.610364 4.34924 0.610364 4.5445 0.805626L4.89805 1.15918Z" fill="#4E5969"/>
                </svg>
            </TracingButton>
            <input className="tracing-filter__by-date"
                   type="date"
                   min="2018-01-01" max="2018-12-31"
                   onChange={onDateChange}
            />
            <TracingButton onClick={toNextDate}>
                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.10195 1.15918C0.906684 1.35444 0.906684 1.67102 1.10195 1.86629L3.28205 4.04639L1.16442 6.16402C0.969155 6.35929 0.969155 6.67587 1.16442 6.87113L1.51797 7.22468C1.71323 7.41995 2.02982 7.41995 2.22508 7.22468L5.0535 4.39626C5.24877 4.201 5.24877 3.88441 5.0535 3.68915L4.69995 3.3356C4.68255 3.31819 4.66418 3.30234 4.64502 3.28804L2.16261 0.805626C1.96734 0.610364 1.65076 0.610364 1.4555 0.805626L1.10195 1.15918Z" fill="#4E5969"/>
                </svg>
            </TracingButton>
        </div>
    );
};

export default TracingFilter;