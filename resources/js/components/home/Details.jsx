import React, {useState, useEffect, useRef} from 'react';
import { useParams } from "react-router-dom"
import { getConteneur, getConteneurImages } from "../../services/dataService.jsx";
import Lotties from "../lotties.jsx";
import no_result from "../../assets/lotties/no_result.json";
import {format_date} from "../helper.jsx";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import {galleryData} from "../../data/gallery.js";
import Gallery from "../Gallery.jsx";

export default function Details () {
    const [conteneur, setConteneur] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id: idParam } = useParams();
    const [galleryLoaded, setGalleryLoaded] = useState(false);

    useEffect(() => {
        try {
            idParam && getConteneur(idParam)
                .then((response) => {
                    setConteneur(response.data)

                    // getting images
                    getConteneurImages(idParam)
                        .then((response) => {
                            console.log(response.data.images)
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

    useEffect(() => {
        console.log(conteneur);
    }, [conteneur]);

    return (
        <>

            {
                 conteneur ? (
                     <div className={'mt-5 p-2'}>
                        {/* details*/}
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>N° de dossier : </span> <span className={"fw-bold"}>{conteneur.numero}</span>
                            </div>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>Quantité : </span> <span className={"fw-bold"}>{conteneur.quantity}</span>
                            </div>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>Reste : </span> <span className={"fw-bold"}>{conteneur.reste}</span>
                            </div>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>Reçu le  : </span> <span className={"fw-bold"}> { format_date(conteneur.created_at)} </span>
                            </div>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>Par </span>
                                <span className={"fw-bold"}>
                                    { `${conteneur.creator.name} ` }
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
                                backgroundColor : '#f8f9fa'
                            }}
                         >
                             { galleryLoaded && <Gallery dataImages={images} noTrash={true}/> }
                         </div>
                    </div>
                )
                 :
                !loading ? (
                    <div>
                        <Lotties source={no_result} />
                        <p className={'text-center'}>Resource non trouvée</p>
                    </div>
                ):
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
