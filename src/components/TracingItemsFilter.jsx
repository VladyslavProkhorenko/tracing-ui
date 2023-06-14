import React, { useEffect, useState } from "react";
import TracingRadio from "./TracingRadio";
import TracingStepsList from "./TracingStepsList";
import "./../styles/TracingItemsFilter.scss";

const TracingItemsFilter = ({ entitySteps, onFilter }) => {
    const [ selectedType, setSelectedType ] = useState("all") ;
    const [ selectedSteps, setSelectedSteps ] = useState([]) ;
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
    ];

    const onTypeChange = event => {
        setSelectedType(event.target.value);
    }

    const onStepSelect = name => {
        const stepIndex = findStepInActivated(name);
        let steps;

        if (stepIndex !== -1) {
            steps = [ ...selectedSteps ];
            steps.splice(stepIndex, 1);
        } else {
            steps = [
                ...selectedSteps,
                name
            ];
        }
        setSelectedSteps(steps);
    }

    const findStepInActivated = name => {
        return selectedSteps.findIndex( step => step === name)
    }

    useEffect(() => {
        onFilter(selectedType, selectedSteps);
    }, [ selectedType, selectedSteps ])

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
                            onChange={onTypeChange}
                        />
                    )
                }
            </div>
            {
                selectedType !== "all" &&
                <TracingStepsList entitySteps={entitySteps}
                    selectedSteps={selectedSteps}
                    onSelect={onStepSelect}
                />
            }
        </div>
    );
};

export default TracingItemsFilter;
