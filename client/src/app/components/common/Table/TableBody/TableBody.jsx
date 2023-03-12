import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;

            return component(item);
        }
        return _.get(item, columns[column].path);
    };

    return (
        <tbody className="table-body">
            {data.map((item) => (
                <tr key={item._id} className={"table-body__item"}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
