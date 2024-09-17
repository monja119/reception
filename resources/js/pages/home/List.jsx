import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {format_date} from "../../components/helper.jsx";
import { logout, activateUser, deleteUser } from "../../services/authService.js";
import { notifyError, notifySucess } from "../../components/notificationManager.jsx";
import Pagination from "../../components/Pagination.jsx";

export default function List({articles, setArticles, page, handlePage}) {
    const userStore = useSelector((state) => state.reception_user.user);
    const [loading, setLoading] = useState(false);


    const deleting = (index, id) => {
        confirm('Voulez-vous vraiment supprimer cet utilisateur ?') && deleteUser(id)
            .then(() => {
                notifySucess('Utilisateur supprimé')
                let newUsers = [...articles];
                newUsers.splice(index, 1);
                setArticles(newUsers);
            })
            .catch((error) => {
                console.error(error);
                notifyError("Erreur lors de la suppression : " + error.message)
            })
    }

    return (
        <>
            <table className="table table-striped table-hover mt-3">
                <thead>
                <tr className="small">
                    <th style={{backgroundColor: "#2c3e50", borderRadius: "15px 0px 0px 0px"}}
                        className='table-header text-white'>ID
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Nom
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Login
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Rôle
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Groupe
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Site
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Date création
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Dérnière connexion
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Compte
                    </th>
                    <th style={{backgroundColor: "#2c3e50"}}
                        className='table-header text-white'>Connéxion
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
                                    <td> Article</td>

                                </tr>
                            )

                        })
                }
                </tbody>
            </table>

            <div className={'w-100 d-flex flex-row justify-content-center'}>
                <Pagination page={page} handlePage={handlePage} dataLength={articles.length} />
            </div>
     </>
    )
    ;
}
