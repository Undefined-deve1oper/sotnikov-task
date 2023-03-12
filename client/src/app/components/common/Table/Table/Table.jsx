import React, { useEffect } from "react";
import usePaginate from "../../../../hooks/usePaginate";
import TableBody from "../TableBody";
import TableFooter from "../TableFooter";
import TableHeader from "../TableHeader";
import "./styles/table.css";

export const Table = ({ children, data, columns }) => {
    const {
        itemsListCrop: dataCrop,
        handlePageChange,
        page,
        limit,
        handleLimitChange
    } = usePaginate(data, 3, 1);

    useEffect(() => {
        if (dataCrop.length === 0) {
            handlePageChange(1);
        }
    }, [dataCrop]);

    return (
        <div className="table-wrapper">
            <table className="table">
                {children || (
                    <>
                        <TableHeader columns={columns} />
                        <TableBody data={dataCrop} columns={columns} />
                        <TableFooter
                            {...{
                                data,
                                handleLimitChange,
                                page,
                                limit,
                                handlePageChange
                            }}
                        />
                    </>
                )}
            </table>
        </div>
    );
};

export default Table;
