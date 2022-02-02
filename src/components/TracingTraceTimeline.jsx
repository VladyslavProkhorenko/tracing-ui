import React from 'react';
import "./../styles/TracingTraceTimeline.scss";

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
                        <div className="trace-timeline__item__time">{ step.datetime }</div>
                    </div>
                )
            )}
        </div>
    );
};

export default TracingTraceTimeline;