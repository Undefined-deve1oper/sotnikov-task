import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import Appbar from "../components/common/Appbar/Appbar";
import Backdrop from "../components/ui/Backdrop/Backdrop";
import EditPost from "../components/ui/EditPost/EditPost";
import { setEditingPost } from "../store/features/postSlice";
import ProtectedRoute from "./ProtectedRoute";

const Posts = lazy(() => import("../layouts/Posts/Posts"));
const SinglePost = lazy(() => import("../layouts/SinglePost/SinglePost"));
const SingleArticle = lazy(() =>
    import("../layouts/SingleArticle/SingleArticle")
);
const Profile = lazy(() => import("../layouts/Profile/Profile"));
const Chat = lazy(() => import("../layouts/Chat/Chat"));
const MessengerPage = lazy(() => import("../layouts/Messenger/Messenger"));
const Purposes = lazy(() => import("../layouts/Purposes/Purposes"));
const About = lazy(() => import("../layouts/About/About"));
const Contacts = lazy(() => import("../layouts/Contacts/Contacts"));
const Articles = lazy(() => import("../layouts/Articles/Articles"));
const NotFound = lazy(() => import("../layouts/NotFound/NotFound"));

const Layout = () => {
    const {
        post: { editingPost }
    } = useSelector((state) => state);

    const dispatch = useDispatch();

    const closeEditing = () => {
        dispatch(setEditingPost({}));
    };

    return (
        <>
            <Backdrop show={!!editingPost._id} onClose={closeEditing}>
                <EditPost close={closeEditing} />
            </Backdrop>
            <Appbar />
            <Suspense fallback={<ProgressBar />}>
                <Outlet />
            </Suspense>
        </>
    );
};

const Router = () => {
    const authenticate = (Comp) => (
        <ProtectedRoute>
            <Comp />
        </ProtectedRoute>
    );

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Posts />} />
                <Route path="/about" element={<About />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="/chat" element={authenticate(Chat)} />
                <Route
                    path="/chat/messenger"
                    element={authenticate(MessengerPage)}
                />
                <Route path="/purposes" element={<Purposes />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<SingleArticle />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default Router;
