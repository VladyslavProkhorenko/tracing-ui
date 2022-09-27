import React from 'react';
import "./../styles/TracingTraceTimeline.scss";
import moment from "moment";

const formatDate = (date) => {
    if (!date) return "No date";

    return moment(date).format("HH:mm:ss DD.MM.YYYY");
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