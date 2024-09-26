import React from "react";
import { useSelector } from 'react-redux';
import CreateArticle from "./createArticle.jsx";
export default function Home() {
    const userStore = useSelector((state) => state.reception_user.user);

    return (
        <div>
            <div className="row mt-2 justify-content-end">
                <CreateArticle user={userStore} />
            </div>
        </div>
    );
}
