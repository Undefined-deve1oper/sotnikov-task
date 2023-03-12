import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";
import "./articles.css";

const Articles = () => {
    const {
        articles: {
            allArticles: { articles, page, isLoading }
        }
    } = useSelector((state) => state);

    return (
        <section className="article-pages">
            <div className="article-pages__row">
                <ul className="article-pages__list">
                    {articles.length > 0 && !isLoading ? (
                        articles.map((article) => (
                            <NavLink
                                key={article._id}
                                to={`/articles/${article._id}`}
                                className="article-card"
                            >
                                <div className="article-card__image">
                                    <img src={article?.image} alt="image" />
                                </div>
                                <div className="article-card__content">
                                    <h1 className="article-card__title">
                                        {article.title}
                                    </h1>
                                    <p className="article-card__text">
                                        {article.previewText}
                                    </p>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <Loading />
                    )}
                </ul>
            </div>
        </section>
    );
};

export default Articles;
