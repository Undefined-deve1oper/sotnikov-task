import React from "react";

const TableHeader = ({ columns }) => {
    return (
        <thead className="table-header">
            <tr className="table-header__item">
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
