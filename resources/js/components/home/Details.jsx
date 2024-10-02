import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom"
import {deleteConteneur, getConteneur, getConteneurImages} from "../../services/dataService.jsx";
import Lotties from "../lotties.jsx";
import no_result from "../../assets/lotties/no_result.json";
import {format_date} from "../helper.jsx";
import 'photoswipe/style.css';
import UpdateUserModal from "../Modals/EditArticleModal.jsx";
import Gallery from "../Gallery.jsx";
import {notifyError, notifySucess} from "../notificationManager.jsx";

export default function Details () {
    const [conteneur, setConteneur] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id: idParam } = useParams();
    const [galleryLoaded, setGalleryLoaded] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [indexEdit, setIndexEdit] = useState(0)
    const handleOpenEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)

    const deleting = (id) => {
        setLoading(true)
        confirm('Voulez-vous vraiment supprimer ce conteneur ?') && deleteConteneur(id)
            .then(() => {
                notifySucess('Article supprimé')
                // go back to the list
                window.location.href = '/list';
            })
            .catch((error) => {
                console.error(error);
                notifyError("Erreur lors de la suppression : " + error.message)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        try {
            idParam && getConteneur(idParam)
                .then((response) => {
                    setConteneur(response.data)

                    // getting images
                    getConteneurImages(idParam)
                        .then((response) => {
                            const result = response.data.images.map((image, index) => {
                                return {
                                    data: '/'+image.path,
                                    id: index
                                }
                            });
                            setImages(result);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                        .finally(() => setGalleryLoaded(true));
                })
                .finally(() => setLoading(false));
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);


    return (
        <>

            {
                 conteneur ? (
                     <div className={'mt-5 p-2'}>
                         {/* update */}
                         <UpdateUserModal
                             show={showEdit}
                             handleClose={handleCloseEdit}
                             conteneur={conteneur}
                             setConteneur={setConteneur}
                         />

                        {/* details*/}
                         <div className={"row"}>
                             <div className={"col-12 d-flex flex-row justify-content-end gap-2"}>
                                 <button
                                     className={`btn btn-sm ml-1 btn-secondary`}
                                     onClick={async () => {
                                         handleOpenEdit()
                                     }}
                                 >
                                     <span className="fa fa-edit"></span>
                                 </button>
                                 <button
                                     className={`btn btn-sm btn-danger ml-1`}
                                     onClick={() => deleting(conteneur.id)}
                                     disabled={loading}
                                 >
                                     <span className="fa fa-trash"></span>
                                 </button>
                             </div>
                             <div className={"col-12 mt-3"}>
                                 <span className={"opacity-75"}>N° de dossier : </span> <span
                                 className={"fw-bold"}>{conteneur.numero}</span>
                             </div>
                             <div className={"col-12"}>
                                 <span className={"opacity-75"}>Quantité : </span> <span
                                 className={"fw-bold"}>{conteneur.quantity}</span>
                             </div>
                             <div className={"col-12"}>
                                 <span className={"opacity-75"}>Reste : </span> <span
                                 className={"fw-bold"}>{conteneur.reste}</span>
                             </div>
                             <div className={"col-12"}>
                                 <span className={"opacity-75"}>Reçu le  : </span> <span
                                 className={"fw-bold"}> {format_date(conteneur.created_at)} </span>
                             </div>
                             <div className={"col-12"}>
                                 <span className={"opacity-75"}>Par </span>
                                 <span className={"fw-bold"}>
                                    {`${conteneur.creator.name} `}
                                </span>
                             </div>
                             <div className={"col-12"}>
                                 <span className={"opacity-75"}>Images :</span>
                             </div>
                         </div>

                         {/* gallery of images*/}
                         <div className={'row mt-2 border-1 rounded'}
                              style={{
                                  minHeight: '300px',
                                  maxHeight: '600px',
                                  overflowY: 'auto',
                                  backgroundColor: '#f8f9fa'
                              }}
                         >
                             {
                                 galleryLoaded
                                 &&
                                 <Gallery
                                     dataImages={images}
                                     noTrash={true}
                                     downloadable={true}
                                     downloadableName={conteneur?.numero}
                                 />
                             }
                         </div>
                     </div>
                     )
                     :
                     !loading ? (
                             <div>
                                 <Lotties source={no_result}/>
                                 <p className={'text-center'}>Resource non trouvée</p>
                             </div>
                         ) :
                         (
                             <div className={'d-flex justify-content-center justify-content-center mt-5'}>
                                 <div className={'spinner-border'} role={'status'}>
                                     <span className={'visually-hidden'}>Loading...</span>
                                 </div>
                             </div>
                         )
            }
        </>
    );
}
