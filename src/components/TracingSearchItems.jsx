import React, { useEffect, useState } from 'react';
import TracingUIService from "../services/TracingUI.service";
import "./../styles/TracingSearchItems.scss";

const TracingSearchItems = ({ entityId, onReset, onSearch }) => {
    const [ query, setQuery ] = useState('');
    const [ searchTimeout, setSearchTimeout ] = useState(null);

    const onInput = (e) => {
        setQuery(e.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
    }

    const search = async (query) => {
        if (!query.length) {
            onReset();
            return;
        }

        const items = await TracingUIService.searchItems(query, entityId);
        onSearch(items);
    }

    useEffect(() => {
        setSearchTimeout(
            setTimeout(() => search(query), 500)
        );
    }, [ query ])

    return (
        <div className="tracing-search-items">
            <input type="text"
                   placeholder="Input to search..."
                   value={query}
                   onInput={onInput}
            />
        </div>
    );
};

export default TracingSearchItems;