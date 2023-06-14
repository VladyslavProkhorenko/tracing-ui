import React, { useEffect, useState } from "react";
import "./../styles/TracingPagination.scss";

const TracingPagination = ({ pagesCount, currentPage, onPageChange }) => {
    const [ pages, setPages ] = useState([]);

    useEffect(() => {
        let pagesArr = [];
        setPages([]);

        for (let i = 1; i <= pagesCount; i++) {
            pagesArr.push(i);
        }

        if (pagesCount > 7) {
            let firstItemIndex = currentPage - 4;
            let lastItemIndex = currentPage + 3;

            if (firstItemIndex < 0) {
                lastItemIndex -= firstItemIndex;
                firstItemIndex = 0;
            } else if (lastItemIndex > pagesCount) {
                firstItemIndex -= lastItemIndex - pagesCount;
            }

            pagesArr = pagesArr.slice(firstItemIndex, lastItemIndex);
        }
        setPages(pagesArr);
    }, [ pagesCount, currentPage ])
    return (
        <div className="tracing-pagination">
            {
                pages &&
                <>
                    {
                        currentPage !== 1 &&
                        <>
                            <div className="tracing-pagination__anchor"
                                onClick={ () => onPageChange(1) }
                            >First</div>
                        </>
                    }
                    {
                        pages.map(
                            (page) =>
                                <div className={`tracing-pagination__page ${page === currentPage ? "current" : ""}`}
                                    key={page}
                                    onClick={ () => onPageChange(page) }
                                >{ page }</div>
                        )
                    }
                    {
                        currentPage !== pagesCount &&
                        <>
                            <div className="tracing-pagination__anchor"
                                onClick={ () => onPageChange(pagesCount) }
                            >Last</div>
                        </>
                    }
                </>
            }
        </div>
    );
};

export default TracingPagination;
