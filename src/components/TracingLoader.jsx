import React from "react";
import "./../styles/TracingLoader.scss"

const TracingLoader = ({ active }) => {
    return (
        <div className={`tracing-loader ${active ? "active" : ""}`}>
            <div className="tracing-loader__text">Loading</div>
            <div className="tracing-loader__dot">.</div>
            <div className="tracing-loader__dot">.</div>
            <div className="tracing-loader__dot">.</div>
        </div>
    );
};

export default TracingLoader;