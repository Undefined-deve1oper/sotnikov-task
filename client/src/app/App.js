import React, { useEffect, useState } from "react";
//utilities
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import useFetch from "./hooks/useFetch.js";
import SERVER_URI from "./serverUri";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
    addMessages,
    clearMessage,
    deleteChat,
    updateChats
} from "./store/features/messageSlice.js";
import { showModal } from "./store/features/modalSlice.js";
import { setPosts } from "./store/features/postSlice.js";
import { setSocket } from "./store/features/socketSlice";
import { login } from "./store/features/userSlice.js";
import { addOnline, getUsers } from "./store/features/usersSlice.js";
//components
import Modal from "./components/common/Modal/Modal.jsx";
import Backdrop from "./components/ui/Backdrop/Backdrop.jsx";
import Online from "./components/ui/Online/Online.jsx";
import Loading from "./components/common/Loading/Loading.jsx";
import ThemeSwitch from "./components/ui/ThemeSwitch/ThemeSwitch.jsx";
import "./index.css";
import Auth from "./layouts/Auth/Auth.jsx";
import Router from "./routes";
import { loadTicketsList } from "./store/features/ticketSlice.js";
import { setArticles } from "./store/features/articlesSlice.js";

const App = () => {
    const dispatch = useDispatch();
    const customFetch = useFetch();
    const [theme, setTheme] = useState("dark");
    const {
        user: { id, isGuest },
        modal: { isLoading, isSidebarVisible },
        socket: { socket },
        message: { to, conversationID }
    } = useSelector((state) => state);

    //login
    useEffect(() => {
        const user = Cookies.get("user");
        if (user) {
            dispatch(login(JSON.parse(user)));
            dispatch(loadTicketsList());
        } else dispatch(login({ id: "guest", isGuest: true }));
    }, [dispatch]);

    //get users and chats and init socket
    useEffect(() => {
        if (id) {
            const query = `id=${id}`;
            dispatch(getUsers({ customFetch }));
            dispatch(setPosts({ customFetch }));
            dispatch(setArticles({ customFetch }));
            if (!isGuest) dispatch(setSocket(io(SERVER_URI, { query })));
        }
    }, [id, customFetch, dispatch, isGuest]);

    //socket events
    useEffect(() => {
        if (socket) {
            socket.on("usersOnline", (users) => dispatch(addOnline(users)));
            socket.on("delete chat", (id) => dispatch(deleteChat(id)));
        }
    }, [socket, dispatch]);

    useEffect(() => {
        if (socket) {
            socket
                .off("receive message")
                .on("receive message", (message, senderID) => {
                    dispatch(showModal({ msg: "1 new message" }));
                    dispatch(
                        updateChats({
                            lastMessage: message,
                            id: senderID,
                            customFetch
                        })
                    );
                    senderID === to && dispatch(addMessages({ text: message }));
                });
            socket
                .off("clear chat")
                .on("clear chat", (id) =>
                    dispatch(clearMessage({ conversationID: id }))
                );
        }
    }, [customFetch, dispatch, socket, to, conversationID]);

    return (
        <div className={"app " + theme}>
            <div className="container">
                <div
                    className={isSidebarVisible ? "sidebar visible" : "sidebar"}
                >
                    <ThemeSwitch setTheme={setTheme} />
                    <Online />
                </div>
                <ThemeSwitch setTheme={setTheme} />
                <Modal />
                {id ? <Router /> : <Auth />}
            </div>
            <Backdrop show={isLoading}>
                <Loading />
            </Backdrop>
        </div>
    );
};

export default App;
