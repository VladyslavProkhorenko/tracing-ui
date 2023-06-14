import React from "react";
import "./../styles/TracingButton.scss";

const TracingButton = (props) => {
    return (
        <button className={`tracing-button ${props.className}`}
            onClick={props.onClick}
        >{ props.children }</button>
    );
};

export default TracingButton;