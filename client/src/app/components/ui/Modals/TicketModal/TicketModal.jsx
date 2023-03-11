import React from "react";
import Button from "../../../common/Button";

const TicketModal = ({ ticket, onRemoveTicket, open, onClose, ...rest }) => {
    const getCauseName = (name) => {
        switch (name) {
            case "errors":
                return "Баги";
            case "offer":
                return "Вопрос";
            case "other":
                return "Прочее";
            default:
                return name;
        }
    };

    return (
        <div
            className={"modal" + (open ? " _open" : "")}
            {...rest}
            onClick={onClose}
        >
            <div
                className="estate-booking__modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <div className="estate-booking__modal-success_block">
                        <span className="admin__ticket-id">№{ticket._id}</span>
                    </div>
                    <ul className="estate-booking__modal-list">
                        <li className="estate-booking__modal-item">
                            <span className="estate-booking__modal-info">
                                Имя: {ticket.name}
                            </span>
                        </li>
                        <li className="estate-booking__modal-item">
                            <span className="estate-booking__modal-info">
                                Тип: {getCauseName(ticket.cause)}
                            </span>
                        </li>
                        <li className="estate-booking__modal-item">
                            <span className="estate-booking__modal-info">
                                Email: {ticket.email}
                            </span>
                        </li>
                        <li className="estate-booking__modal-item">
                            <span className="estate-booking__modal-info">
                                Сообщение: {ticket.message}
                            </span>
                        </li>
                    </ul>
                </div>

                <Button
                    className="estate-booking__button"
                    onClick={() => onRemoveTicket(ticket._id)}
                >
                    Закрыть Тикет
                </Button>
            </div>
        </div>
    );
};

export default TicketModal;
