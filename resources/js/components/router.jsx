import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/home.jsx";
import Login from "../pages/auth/Login.jsx";
import Logout from "../pages/auth/Logout.jsx";
import { PageNotFound } from "./errors.jsx";

function Router()
{

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />} path={'/'}>
                    <Route path={''} element={<Home />} />
                    <Route path={'/users'} element={<Home />} />
                </Route>
                <Route path={ '/login'} element={<Login />} />
                <Route path={'/logout'} element={<Logout />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router
