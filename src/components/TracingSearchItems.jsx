import { useState } from "react";
import "./../styles/TracingSearchItems.scss";

const TracingSearchItems = ({ onReset, onSearch, defaultQuery }) => {
    const [ query, setQuery ] = useState(defaultQuery);
    const [ searchTimeout, setSearchTimeout ] = useState(null);

    const onInput = (e) => {
        setQuery(e.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(
            setTimeout(() => search(e.target.value), 500)
        );
    }

    const search = async (query) => {
        if (!query.length) {
            onReset();
            return;
        }

        onSearch(query);
    }

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
