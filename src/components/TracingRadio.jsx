import React from 'react';
import "./../styles/TracingRadio.scss";

const TracingRadio = ({ name, label, value, checked, onChange }) => {
    return (
        <label className="tracing-radio">
            <input className="tracing-radio__input"
                   type="radio"
                   name={ name }
                   value={ value }
                   checked={ checked }
                   onChange={ onChange }
            />
            <span className="tracing-radio__icon" />
            <span className="tracing-radio__label">{ label }</span>
        </label>
    );
};

export default TracingRadio;
