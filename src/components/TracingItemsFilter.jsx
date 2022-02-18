import React, { useState } from 'react';
import TracingRadio from "./TracingRadio";
import TracingStepsList from "./TracingStepsList";
import "./../styles/TracingItemsFilter.scss";

const TracingItemsFilter = () => {
    const [ selectedType, setSelectedType ] = useState('all') ;
    const filterTypes = [
        {
            label : "All",
            value : "all"
        },
        {
            label : "Include",
            value : "include"
        },
        {
            label : "Exclude",
            value : "exclude"
        }
    ]
    const onChange = event => {
        setSelectedType(event.target.value);
    }

    return (
        <div className={`tracing-items-filter ${selectedType}`}>
            <div className="tracing-items__types">
                {
                    filterTypes.map( type =>
                        <TracingRadio name="filter_type"
                                      label={type.label}
                                      value={type.value}
                                      checked={type.value === selectedType}
                                      key={type.value}
                                      onChange={onChange}
                        />
                    )
                }
            </div>
            { selectedType !== 'all' && <TracingStepsList /> }
        </div>
    );
};

export default TracingItemsFilter;
