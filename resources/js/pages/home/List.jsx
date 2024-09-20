import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {format_date} from "../../components/helper.jsx";
import { notifyError, notifySucess } from "../../components/notificationManager.jsx";
import Pagination from "../../components/Pagination.jsx";
import { deleteArticle } from "../../services/dataService.jsx";
import UpdateUserModal from "../../components/Modals/EditArticleModal.jsx";

export default function List({articles, setArticles, page, handlePage, paginationData}) {
    const userStore = useSelector((state) => state.reception_user.user);
    const [loading, setLoading] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [indexEdit, setIndexEdit] = useState(0)
    const handleOpenEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)

    const handleArticle = (articles) => { setArticles(articles) }

    const deleting = (index, id) => {
        setLoading(true)
        confirm('Voulez-vous vraiment supprimer cet article ?') && deleteArticle(id)
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

    return (
        <>
          { articles.length > 0 &&
              <UpdateUserModal
                show={showEdit}
                handleClose={handleCloseEdit}
                index={indexEdit}
                article={articles[indexEdit]}
                articles={articles}
                setArticles={handleArticle}
            />
          }
            <table className="table table-striped table-hover mt-3">
                <thead>
                <tr className="small">
                    <th style={{backgroundColor: "#2c3e50", borderRadius: "15px 0px 0px 0px"}}
                        className='table-header text-white text-center'>ID
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>Numéro
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>Quantité
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>Reste
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>Date de création
                    </th
                    ><th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white text-center'>Dernière modification
                    </th>
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
                                    <td className={"text-center"}> {article.id}</td>
                                    <td className={"text-center"}> {article.numero}</td>
                                    <td className={"text-center"}> {article.quantity}</td>
                                    <td className={"text-center"}> {article.reste}</td>
                                    <td className={"text-center"}> {format_date(article.created_at)}</td>
                                    <td className={"text-center"}> {format_date(article.updated_at)}</td>
                                    <td className={"d-flex flex-row justify-content-center gap-2"}>
                                        {/*<button*/}
                                        {/*    className={`btn btn-sm ml-1 btn-primary`}*/}
                                        {/*>*/}
                                        {/*    <span className="fa fa-eye"></span>*/}
                                        {/*</button>*/}
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
