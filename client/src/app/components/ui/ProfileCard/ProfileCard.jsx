import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
    cakeIcon,
    cameraIcon,
    clockIcon,
    dp,
    locationIcon,
    mailIcon
} from "../../../assets";
import useFetch from "../../../hooks/useFetch";
import { createChat } from "../../../store/features/messageSlice";
import { setIsLoading, showModal } from "../../../store/features/modalSlice";
import { logout } from "../../../store/features/userSlice";
import getDateString from "../../../utils/getDateString";
import ImageUpload from "../../common/ImageUpload/ImageUpload";
import Backdrop from "../Backdrop/Backdrop";
import SetupProfile from "../SetupProfile/SetupProfile";
import "./profilecard.css";

const ProfileCard = ({ id, isOwnProfile }) => {
    const {
        users: { users },
        user: { isGuest }
    } = useSelector((state) => state);
    const user = users.find((user) => user._id === id) || {};
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const customFetch = useFetch();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { name, email, about, dob, location, createdAt, profileImage } = user;
    createdAt = `Joined on ${getDateString(createdAt)}`;
    dob = getDateString(dob);

    const sendMessage = async () => {
        if (isGuest)
            return dispatch(
                showModal({ msg: "Войдите в аккаунт или зарегистрируйтесь!!" })
            );
        dispatch(setIsLoading(true));
        dispatch(createChat({ customFetch, id })).then(() => {
            if (window.innerWidth < 801) navigate("/chat/messenger");
            else navigate("/chat");
            dispatch(setIsLoading(false));
        });
    };

    const hideUploading = () => {
        setIsUploading(false);
    };
    const hideEditing = () => {
        setIsEditing(false);
    };

    return (
        <section className="profilecard gradient-border">
            {isOwnProfile && (
                <>
                    <Backdrop show={isEditing} onClose={hideEditing}>
                        <SetupProfile close={hideEditing} user={user} />
                    </Backdrop>
                    <Backdrop show={isUploading} onClose={hideUploading}>
                        <ImageUpload close={hideUploading} />
                    </Backdrop>
                </>
            )}
            <header>
                <div>
                    <img
                        src={profileImage || dp}
                        alt="profile_image"
                        className="profilecard__dp roundimage"
                    />
                    {isOwnProfile && (
                        <div className="dp-upload">
                            <img
                                src={cameraIcon}
                                alt="change_profile_image"
                                onClick={() => setIsUploading(true)}
                            />
                        </div>
                    )}
                </div>
                <h1>{name || "User"}</h1>
                <h2>{about || "About"}</h2>
            </header>
            <article>
                <div className="profilecard__info">
                    <img src={clockIcon} alt="join date" />
                    <h3>{createdAt}</h3>
                </div>
                <div className="profilecard__info">
                    <img src={locationIcon} alt="location" />
                    <h3>{location}</h3>
                </div>
                <div className="profilecard__info">
                    <img src={mailIcon} alt="mail" />
                    <h3>{email}</h3>
                </div>
                <div className="profilecard__info">
                    <img src={cakeIcon} alt="date of birth" />
                    <h3>{dob}</h3>
                </div>
            </article>
            {isOwnProfile ? (
                <div className="btn-group">
                    <button onClick={() => dispatch(logout())}>Выйти</button>
                    <button onClick={() => setIsEditing(true)}>
                        Изменить профиль
                    </button>
                </div>
            ) : (
                <div className="btn-group">
                    <button onClick={sendMessage}>Сообщения</button>
                    <button disabled>Добавить в друзья</button>
                </div>
            )}
            {user?.role === "ADMIN" && (
                <NavLink to="/admin" className={"admin-btn"}>
                    Панель администратора
                </NavLink>
            )}
        </section>
    );
};

export default ProfileCard;
