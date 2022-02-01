import React, {useState} from 'react';
import "./../styles/TracingDropdown.scss";

const TracingDropdown = ({ onChange }) => {
    const [ query, setQuery ] = useState('');
    const [ isDropdownVisible, setDropdownVisibility ] = useState(false);
    
    const search = (e) => {
        setQuery(e.target.value)
        console.log('search', e.target.value);
    }
    
    return (
        <div className="tracing-dropdown">
            <input className="tracing-dropdown__input"
                   type="text"
                   placeholder="Search item to trace..."
                   value={query}
                   onInput={search}
                   onFocus={ () => setDropdownVisibility(true) }
                   onBlur={ () => setDropdownVisibility(false) }
            />
            
            <div className={`tracing-dropdown__list ${isDropdownVisible ? "active" : ""}`}>
                <div className="tracing-dropdown__list__item"
                     onClick={ () => onChange(1) }
                >Lead #1</div>
                <div className="tracing-dropdown__list__item"
                     onClick={ () => onChange(2) }
                >Lead #2</div>
                <div className="tracing-dropdown__list__item"
                     onClick={ () => onChange(3) }
                >Lead #3</div>
                <div className="tracing-dropdown__list__item"
                     onClick={ () => onChange(4) }
                >Lead #4</div>
                <div className="tracing-dropdown__list__item"
                     onClick={ () => onChange(5) }
                >Lead #5</div>
            </div>
        </div>
    );
};

export default TracingDropdown;