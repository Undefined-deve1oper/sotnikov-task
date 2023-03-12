import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useSort from "../../../../hooks/useSort";
import { getFormatDate } from "../../../../utils/dateHelpers";
import Button from "../../../common/Button";
import Table from "../../../common/Table";
import {
    deleteUser,
    getUsersList
} from "../../../../store/features/usersSlice";
import { getCurrentUserId } from "../../../../store/features/userSlice";

const UsersTable = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());
    const { sortBy, setSortBy, sortedItems } = useSort(users, {
        path: "name",
        order: "desc"
    });

    if (users) {
        const columns = {
            name: {
                name: "Имя",
                path: "name",
                component: (user) => (
                    <NavLink to={`/user/${user.id}`}>{user.name}</NavLink>
                )
            },
            email: {
                name: "Email",
                path: "email"
            },
            role: {
                name: "Роль",
                path: "role",
                component: (user) => (
                    <>
                        {user.role === "ADMIN" ? "Администратор" : "Посетитель"}
                    </>
                )
            },
            createdAt: {
                name: "Аккаунт создан:",
                component: (user) => (
                    <span>{getFormatDate(user.createdAt)}</span>
                )
            },
            delete: {
                component: (user) => (
                    <>
                        {user._id !== currentUserId && (
                            <Button
                                onClick={() => dispatch(deleteUser(user._id))}
                                className="table-body__btn"
                            >
                                Удалить
                            </Button>
                        )}
                    </>
                )
            }
        };

        if (sortedItems) {
            return (
                <Table
                    selectedSort={sortBy}
                    columns={columns}
                    data={sortedItems}
                    onSort={setSortBy}
                />
            );
        }
    }
    return <h1>Пользователей пока нет</h1>;
};

export default UsersTable;
