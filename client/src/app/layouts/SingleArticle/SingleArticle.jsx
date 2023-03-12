import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleCard from "../../components/ui/ArticleCard/ArticleCard";
import useFetch from "../../hooks/useFetch";
import { fetchArticlesService } from "../../services/articleServices";
import { setSingleArticle } from "../../store/features/articlesSlice";

const SingleArticle = () => {
    const { id } = useParams();
    const { token } = JSON.parse(Cookies.get("user") ?? "{}");
    const { singleArticle } = useSelector((state) => state.articles);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const data = await customFetch(fetchArticlesService, { id });
            if (data) dispatch(setSingleArticle(data.article));
            setIsLoading(false);
        })();
    }, [id, token, dispatch, customFetch]);

    return (
        <section className="single-article">
            <div className="single-article__wrapper">
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <ArticleCard item={singleArticle} />
                )}
            </div>
        </section>
    );
};

export default SingleArticle;
