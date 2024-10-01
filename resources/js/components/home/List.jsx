import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import {format_date} from "../helper.jsx";
import { notifyError, notifySucess } from "../notificationManager.jsx";
import Pagination from "../Pagination.jsx";
import {deleteConteneur, getConteneurs} from "../../services/dataService.jsx";
import UpdateUserModal from "../Modals/EditArticleModal.jsx";
import {useNavigate} from "react-router-dom";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if(dd < 10) {
    dd = '0' + dd;
}
if(mm < 10) {
    mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;

export default function List() {
    const userStore = useSelector((state) => state.reception_user.user);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [noResult, setNoResult] = useState(false);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [initial_date, setInitial_date] = useState(today);
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
        getConteneurs(data)
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



    const [showEdit, setShowEdit] = useState(false);
    const [indexEdit, setIndexEdit] = useState(0)
    const handleOpenEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)

    const handleArticle = (articles) => { setArticles(articles) }

    const deleting = (index, id) => {
        setLoading(true)
        confirm('Voulez-vous vraiment supprimer cet article ?') && deleteConteneur(id)
            .then(() => {
                notifySucess('Article supprimé')
                let newUsers = [...articles];
                newUsers.splice(index, 1);
                setArticles(newUsers);
            })
            .catch((error) => {
                console.error(error);
                notifyError("Erreur lors de la suppression : " + error.message)
            })
            .finally(() => {
                setLoading(false);
            });
    }


    // make init date today
    useEffect(() => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if(dd < 10) {
            dd = '0' + dd;
        }
        if(mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        setInitial_date(today);
        setFinal_date(today);
    }, []);
    return (
        <>
            {articles.length > 0 &&
                <UpdateUserModal
                    show={showEdit}
                    handleClose={handleCloseEdit}
                    index={indexEdit}
                    article={articles[indexEdit]}
                    articles={articles}
                    setArticles={handleArticle}
                />
            }
            <div
                className="search-bar d-flex flex-row align-items-center justify-content-end py-2 gap-1 flex-sm-basis-100 flex-md-basis-100"
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="N° dossier"
                    style={{width: '250px'}}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                /> de
                <input
                    type="date"
                    className="form-control"
                    style={{width: '150px'}}
                    onChange={(e) => setInitial_date(e.target.value)}
                    value={initial_date}
                />
                - à -
                <input
                    type="date"
                    className="form-control"
                    style={{width: '150px'}}
                    onChange={(e) => setFinal_date(e.target.value)}
                    value={final_date}
                />
            </div>

            <table className="table table-striped table-hover mt-3">
                <thead>
                <tr className="small">
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>N° dossier
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>Nombre
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>Reste
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>Date de réception
                    </th
                    >
                    <th style={{backgroundColor: "#2c3e50", borderRadius: "0px 15px 0px 0px"}}
                        className='table-header text-white text-center'>Actions
                    </th>
                </tr>
                </thead>

                <tbody>
                {
                    articles.length > 0 && articles.map(
                        (article, index) => {
                            return (
                                <tr
                                    className="small cursor-pointer hover-accent"
                                    key={index}
                                >
                                    <td className={"text-center"}> {article.numero}</td>
                                    <td className={"text-center"}> {article.quantity}</td>
                                    <td className={"text-center"}> {article.reste}</td>
                                    <td className={"text-center"}> {format_date(article.created_at)}</td>
                                    <td className={"d-flex flex-row justify-content-center gap-2"}>
                                        <Link
                                            to={`/details/${article.id}`}
                                            className={`btn btn-sm ml-1 btn-primary`}
                                        >
                                            <span className="fa fa-eye"></span>
                                        </Link>
                                        <button
                                            className={`btn btn-sm ml-1 btn-secondary`}
                                            onClick={async () => {
                                                await setIndexEdit(index)
                                                handleOpenEdit()
                                            }}
                                        >
                                            <span className="fa fa-edit"></span>
                                        </button>
                                        <button
                                            className={`btn btn-sm btn-danger ml-1`}
                                            onClick={() => deleting(index, article.id)}
                                            disabled={loading}
                                        >
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </td>
                                </tr>
                            )

                        })
                }
                </tbody>
            </table>

            <div className={'w-100 d-flex flex-row justify-content-center'}>

                <Pagination
                    page={page}
                    handlePage={handlePage}
                    dataLength={articles.length}
                    paginationData={paginationData}
                />
            </div>
        </>
    )
        ;
}
