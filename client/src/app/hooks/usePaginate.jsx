import { useCallback, useState } from "react";

function usePaginate(items, defaultLimitSize, defaultCurrentPage) {
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(defaultLimitSize);
    const [page, setPage] = useState(defaultCurrentPage);

    const handlePageChange = useCallback((pageIndex) => {
        setPage(pageIndex);
    }, []);
    const handleLimitChange = useCallback((event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(1);
    }, []);

    const itemsListCrop = items.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit
    );

    return {
        itemsListCrop,
        handlePageChange,
        handleLimitChange,
        totalPages,
        limit,
        page
    };
}

export default usePaginate;
