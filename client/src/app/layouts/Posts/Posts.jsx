import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../components/ui/CreatePost/CreatePost";
import InfinityScroll from "../../components/common/InfinityScroll/InfinityScroll";
import Online from "../../components/ui/Online/Online";
import Posts from "../../components/ui/Post/Posts";
import ProfileCard from "../../components/ui/ProfileCard/ProfileCard";
import { setAllPosts } from "../../store/features/postSlice";
import useFetch from "../../hooks/useFetch";
import { fetchPostsService } from "../../services/postServices";
import Guest from "../../components/ui/ProfileCard/Guest";
import "./post.css";

const PostsPage = () => {
    const {
        post: {
            allPosts: { posts, page, isLoading }
        },
        user: { id, isGuest }
    } = useSelector((state) => state);

    const customFetch = useFetch();
    const dispatch = useDispatch();

    const getNextPage = async () => {
        const data = await customFetch(fetchPostsService, { page: page + 1 });
        dispatch(
            setAllPosts({ posts: posts.concat(data.posts), page: data.page })
        );
        return data.posts.length;
    };

    return (
        <section className="posts-page">
            <div className="posts-page__left">
                {isGuest ? <Guest /> : <ProfileCard id={id} isOwnProfile />}
            </div>
            <InfinityScroll getNextPage={getNextPage}>
                <main className="posts-page__center">
                    {isGuest || <CreatePost />}
                    <Posts posts={posts} isLoading={isLoading} />
                </main>
            </InfinityScroll>
            <aside className="posts-page__right gradient-border">
                <Online />
            </aside>
        </section>
    );
};

export default PostsPage;
