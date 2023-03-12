import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getTickets,
    getTicketsLoading,
    loadTicketsList
} from "../../../../store/features/ticketSlice";
import Loading from "../../../common/Loading/Loading";
import TicketItem from "../TicketItem";
import "./styles/ticket-list.css";

const TicketList = () => {
    const dispatch = useDispatch();
    const tickets = useSelector(getTickets());
    const ticketsLoading = useSelector(getTicketsLoading());

    useEffect(() => {
        dispatch(loadTicketsList());
    }, []);

    return (
        <ul className="admin__ticket-list">
            {!ticketsLoading ? (
                tickets?.length > 0 ? (
                    tickets.map((ticket) => (
                        <li key={ticket._id} className="admin__ticket-item">
                            <TicketItem ticket={ticket} />
                        </li>
                    ))
                ) : (
                    <p className="booking__error-message">
                        Список тикетов пуст
                    </p>
                )
            ) : (
                <div className="admin__ticket-loader">
                    <Loading />
                </div>
            )}
        </ul>
    );
};

export default TicketList;
