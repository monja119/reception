import React, {useEffect} from "react";
import { useSelector } from 'react-redux';
import {useNavigate, Outlet} from "react-router-dom";
import Header from "../components/header.jsx";

export default function MainLayout() {
    const userStore = useSelector((state) => state.reception_user.user);
    const navigate = useNavigate();


    useEffect(() => {
        if(!userStore) {
            navigate('/login')
        }
    }, []);

    return (
        <>
            <Header user={userStore}/>
            <Outlet />
        </>
    );
}
