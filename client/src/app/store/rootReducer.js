import { combineReducers } from "redux";
import articlesReducer from "./features/articlesSlice";
import messageReducer from "./features/messageSlice";
import modalReducer from "./features/modalSlice";
import postReducer from "./features/postSlice";
import socketReducer from "./features/socketSlice";
import ticketReducer from "./features/ticketSlice";
import userReducer from "./features/userSlice";
import usersReducer from "./features/usersSlice";

export default combineReducers({
    user: userReducer,
    modal: modalReducer,
    post: postReducer,
    message: messageReducer,
    socket: socketReducer,
    users: usersReducer,
    tickets: ticketReducer,
    articles: articlesReducer
});
