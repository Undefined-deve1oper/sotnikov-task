import React from "react";
import Button from "../../../common/Button";
import "./modal.css";

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
            className={"modal_v2" + (open ? " _open" : "")}
            {...rest}
            onClick={onClose}
        >
            <div
                className="estate-booking__modal_v2"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <div className="estate-booking__modal_v2-success_block">
                        <span className="admin__ticket-id">№{ticket._id}</span>
                    </div>
                    <ul className="estate-booking__modal_v2-list">
                        <li className="estate-booking__modal_v2-item">
                            <span className="estate-booking__modal_v2-info">
                                Имя: {ticket.name}
                            </span>
                        </li>
                        <li className="estate-booking__modal_v2-item">
                            <span className="estate-booking__modal_v2-info">
                                Тип: {getCauseName(ticket.cause)}
                            </span>
                        </li>
                        <li className="estate-booking__modal_v2-item">
                            <span className="estate-booking__modal_v2-info">
                                Email: {ticket.email}
                            </span>
                        </li>
                        <li className="estate-booking__modal_v2-item">
                            <span className="estate-booking__modal_v2-info">
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
