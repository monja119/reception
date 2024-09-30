import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home.jsx";
import List from "./components/home/List.jsx";
import Login from "./pages/auth/Login.jsx";
import Logout from "./pages/auth/Logout.jsx";
import { PageNotFound } from "./components/errors.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Details from "./components/home/Details.jsx";

function Router()
{

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainLayout />}>
                    <Route path={''} element={<Home />} />
                    <Route path={'/list'} element={<List />} />
                    <Route path={'/details/:id'} element={<Details />} />
                </Route>
                <Route path={ '/login'} element={<Login />} />
                <Route path={'/logout'} element={<Logout />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router
