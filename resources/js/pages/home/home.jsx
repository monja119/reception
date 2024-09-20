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
    const [initial_date, setInitial_date] = useState('');
    const [final_date, setFinal_date] = useState('');

    const [paginationData, setPaginationData] = useState([]);

    const handlePage = (page) => {
        setPage(page);
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
        setLoading(true);
        // if initial_data not less than final_date
        if(initial_date && final_date && initial_date > final_date) {
            notifyError('La date de début doit être inférieure à la date de fin')
            setLoading(false);
            return;
        }

        const data = {
            page : page,
            search : search,
            initial_date : initial_date,
            final_date : final_date
        }
        getArticles(data)
            .then(async (res) => {
                await setPaginationData(res.data);
                await setArticles(res.data.data);
            })
            .catch((error) => {
                console.error(error);
                notifyError("Erreur lors du chargement des articles")
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, search, initial_date, final_date]);


    return (
        <div>
            {
                userStore &&
                <Header
                    search={search}
                    setSearch={setSearch}
                    user={userStore}
                    initial_date={initial_date}
                    setInitial_date={setInitial_date}
                    final_date={final_date}
                    setFinal_date={setFinal_date}
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

                <List
                    articles={articles}
                    setArticles={setArticles}
                    page={page}
                    handlePage={handlePage}
                    paginationData={paginationData}
                />
        </div>
    );
}
