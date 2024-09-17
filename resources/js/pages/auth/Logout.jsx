import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../reducers/users/userActions.js';
import {useNavigate} from "react-router-dom";
import { logout } from "../../services/authService";
import { notifyError } from "../../components/notificationManager.jsx";

export default function Logout () {
    const userStore = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        logout(userStore.remember_token)
            .then(() => {
                dispatch(clearUser());
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);
                notifyError("Erreur lors de la déconnexion : " + error.message)
            });
    }, []);

    return(
        <span>
            Déconnexion...
        </span>
    )
}
