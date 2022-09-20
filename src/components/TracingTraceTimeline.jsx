import React from 'react';
import "./../styles/TracingTraceTimeline.scss";

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

const formatDate = (date) => {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

const TracingTraceTimeline = ({ steps }) => {
    return (
        <div className="trace-timeline">
            { steps.map(
                step => (
                    <div className="trace-timeline__item"
                         key={step.id}
                    >
                        <div className="trace-timeline__item__name">{ step.name }</div>
                        <div className="trace-timeline__item__dots" />
                        <div className="trace-timeline__item__time">{ formatDate(step.datetime) }</div>
                    </div>
                )
            )}
        </div>
    );
};

export default TracingTraceTimeline;