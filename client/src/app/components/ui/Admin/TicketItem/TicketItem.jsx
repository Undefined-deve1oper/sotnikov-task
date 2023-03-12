import React from "react";
import { useDispatch } from "react-redux";
import useDialog from "../../../../hooks/useDialog";
import {
    confirmTicket,
    removeTicket
} from "../../../../store/features/ticketSlice";
import { getFormatDate } from "../../../../utils/dateHelpers";
import Button from "../../../common/Button";
import TicketModal from "../../Modals/TicketModal";

const TicketItem = ({ ticket }) => {
    const dispatch = useDispatch();
    const { open, handleClickOpen, handleClose } = useDialog();

    const handleTicketConfirm = () => {
        dispatch(confirmTicket({ ...ticket, status: "confirmed" }));
        handleClickOpen();
    };
    const handleRemoveTicket = (ticketId) => {
        dispatch(removeTicket(ticketId));
    };

    return (
        <>
            <div className="admin__ticket-block">
                <span className="admin__ticket-created">
                    {getFormatDate(ticket.created_at)}
                </span>
                <p className="admin__ticket-text">{ticket.name}</p>
                <p className="admin__ticket-text">{ticket.email}</p>
                <Button
                    className="admin__ticket-button"
                    onClick={
                        ticket.status === "pending"
                            ? () => handleTicketConfirm()
                            : () => handleClickOpen()
                    }
                >
                    {ticket.status === "pending"
                        ? "Принять тикет"
                        : "На рассмотрении"}
                </Button>
            </div>
            <TicketModal
                open={open}
                onClose={handleClose}
                ticket={ticket}
                onRemoveTicket={handleRemoveTicket}
            />
        </>
    );
};

export default TicketItem;
