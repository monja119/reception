import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import Lotties from "../../components/lotties.jsx";
import {notifyError} from "../../components/notificationManager.jsx";
import List from "./List.jsx";
import CreateArticle from "./createArticle.jsx";
import Header from "../../components/header.jsx";
import NoResult from "../../components/NoResult.jsx";
import {getArticles, findArticle} from "../../services/dataService.jsx";

export default function Home() {
    const userStore = useSelector((state) => state.reception_user.user);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [noResult, setNoResult] = useState(false);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePage = (page) => {
        setPage(page);
    }

    const handleSearch = () => {
        console.log('searching ...');
    }
    useEffect(() => {
        if(!userStore) {
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        articles.length === 0 ? setNoResult(true) : setNoResult(false);
    }, [articles]);

    useEffect(() => {
        getArticles()
            .then((res) => {
                setArticles(res.data);
            })
            .catch((error) => {
                console.error(error);
                notifyError("Erreur lors du chargement des articles")
            })
    }, []);

    return (
        <div>
            {
                userStore &&
                <Header
                    search={search}
                    setSearch={setSearch}
                    user={userStore}
                    handleSearch={handleSearch}
                />
            }

            <div className="row mt-2 justify-content-end">
                <CreateArticle
                    articles={articles}
                    setArticles={setArticles}
                    user={userStore}
                />
            </div>

            { noResult && <NoResult /> }

            <List articles={articles} setArticles={setArticles} page={page} handlePage={handlePage} />
        </div>
    );
}
