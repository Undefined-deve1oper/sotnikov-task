import React from "react";
import Pagination from "../../Pagination";

const pageSizesList = [
    { value: 3, name: "3" },
    { value: 6, name: "6" },
    { value: 12, name: "12" },
    { value: 18, name: "18" }
];

const TableFooter = ({
    handleLimitChange,
    page,
    limit,
    handlePageChange,
    data
}) => {
    return (
        <tbody className="table-footer">
            <tr className="table-footer__item">
                <td>
                    Отображать по:{" "}
                    <select
                        name="page-size"
                        onChange={handleLimitChange}
                        className={"table-footer__select"}
                    >
                        {pageSizesList.map((item) => (
                            <option
                                key={item.value}
                                value={item.value}
                                defaultValue="3"
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </td>
            </tr>
            <tr className="table-footer__item">
                <td>
                    <Pagination
                        currentPage={page}
                        itemsCount={data.length}
                        onPageChange={handlePageChange}
                        pageSize={limit}
                    />
                </td>
            </tr>
        </tbody>
    );
};

export default TableFooter;
