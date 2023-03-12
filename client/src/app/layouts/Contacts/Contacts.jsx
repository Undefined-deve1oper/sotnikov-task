import React from "react";
import CreateTicketForm from "../../components/ui/Forms/CreateTicketForm/CreateTicketForm";
import "./contacts.css";

const Contacts = () => {
    return (
        <section className="feedback">
            <div className="feedback__container _container">
                <div className="feedback-header">
                    <div className="feedback-header__line"></div>
                    <span className="feedback-header__title">
                        Обратная связь
                    </span>
                </div>
                <h2 className="feedback__title">Оставьте вопрос</h2>
                <div className="feedback-form">
                    <CreateTicketForm />
                </div>
            </div>
        </section>
    );
};

export default Contacts;
