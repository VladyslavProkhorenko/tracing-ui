import React from 'react';
import TracingTree from "./TracingTree";
import TracingDetails from "./TracingDetails";
import "./../styles/TracingContent.scss";
import TracingLoader from "./TracingLoader";

const TracingContent = ({ loading }) => {
    return (
        <div className="tracing-content">
            <TracingLoader active={loading} />
            {
                !loading && <>
                <TracingTree />
                <TracingDetails />
                </>
            }
        </div>
    );
};

export default TracingContent;