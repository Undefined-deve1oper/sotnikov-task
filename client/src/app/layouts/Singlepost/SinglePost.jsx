import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Comments from "../../components/common/Comments/Comments";
import Input from "../../components/common/Input/Input";
import Online from "../../components/ui/Online/Online";
import { Post as PostLoading } from "../../components/ui/Post/Loading";
import Post from "../../components/ui/Post/Post";
import useFetch from "../../hooks/useFetch";
import { fetchPostsService } from "../../services/postServices";
import { commentPost, setSinglePost } from "../../store/features/postSlice";
import "./singlepost.css";

const SinglePost = () => {
    const { id } = useParams();
    const { embed } = Object.fromEntries(
        useLocation()
            .search.slice(1)
            .split("&")
            .map((ele) => ele.split("="))
    );
    const { token } = JSON.parse(Cookies.get("user") ?? "{}");
    const { singlePost } = useSelector((state) => state.post);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const data = await customFetch(fetchPostsService, { id });
            if (data) dispatch(setSinglePost(data.post));
            setIsLoading(false);
        })();
    }, [id, token, dispatch, customFetch]);

    const commentHandler = async (comment) => {
        dispatch(commentPost({ customFetch, id: singlePost._id, comment }));
    };

    if (embed)
        return <>{isLoading ? <PostLoading /> : <Post post={singlePost} />}</>;

    return (
        <section className="singlepost">
            <div className="singlepost__left">
                {isLoading ? (
                    <PostLoading singlepost={true} />
                ) : (
                    <Post singlepost={true} post={singlePost} />
                )}
                <article className="singlepost__comments">
                    <Comments post={singlePost} />
                    <Input
                        placeholder="Write a comment..."
                        handler={commentHandler}
                        showEmoji
                    />
                </article>
            </div>
            <article className="singlepost__right gradient-border">
                <Online />
            </article>
        </section>
    );
};

export default SinglePost;
