import React from "react";
import Tabs from "../../common/Tabs";
import { TicketList, UsersTable } from "../../ui/Admin";
import "./styles/admin-page.css";

// Email -> admin@gmail.com
// Password -> Test1234

const AdminPage = () => {
    const tabsColumns = [
        {
            _id: 0,
            name: "Пользователи",
            component: <UsersTable />
        },
        {
            _id: 1,
            name: "Тикеты",
            component: <TicketList />
        }
    ];

    return (
        <div className="admin__body">
            <Tabs options={tabsColumns} />
        </div>
    );
};

export default AdminPage;
