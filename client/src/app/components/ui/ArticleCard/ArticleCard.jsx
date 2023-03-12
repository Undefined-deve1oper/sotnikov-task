import React from "react";
import "./articleCard.css";

const ArticleCard = ({ item }) => {
    return (
        <div className="art-card">
            <div className="art-card__image">
                <img src={item.image} alt="image" />
            </div>
            <div className="art-card__content">
                <h1 className="art-card__title">{item.title}</h1>
                <p className="art-card__text">{item.fullText}</p>
                <div className="art-card__author">Автор: {item.author}</div>
            </div>
        </div>
    );
};

export default ArticleCard;
