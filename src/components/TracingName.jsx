import React, {useState} from 'react';
import TracingButton from "./TracingButton";
import "./../styles/TracingName.scss";

const TracingName = () => {
    const [ title, setTitle ] = useState('Leads tracing');
    const [ edit, setEdit ] = useState(false);
    
    const toggleEditMode = () => {
        setEdit(!edit);
    }
    
    const setTitleAndClose = (value) => {
        setTitle(value)
        setEdit(false);
    }
    
    return (
        <div className="tracing-name">
            {!edit && <div className="tracing-name__title">{ title }</div>}
            {edit && <input className="tracing-name__input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={
                                (e) => e.code === "Enter"
                                    ? setTitleAndClose(e.target.value)
                                    : ""
                            }
            />}
            <TracingButton onClick={toggleEditMode}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6995 6.93264L13.0886 4.54355C13.2513 4.38083 13.2513 4.11701 13.0886 3.95429L10.7612 1.62692C10.5985 1.4642 10.3347 1.4642 10.1719 1.62692L7.78286 4.01601M10.6995 6.93264L4.56779 13.0643C4.50148 13.1306 4.41475 13.1726 4.32161 13.1835L1.80205 13.4785C1.54179 13.509 1.31835 13.2945 1.33812 13.0332L1.53713 10.4041C1.54465 10.3047 1.58753 10.2113 1.65798 10.1409L7.78286 4.01601M10.6995 6.93264L7.78286 4.01601M0.499878 16.5L15.4999 16.5" stroke="#4E5969" strokeWidth="1.66667"/>
                </svg>
            </TracingButton>
        </div>
    );
};

export default TracingName;