import React, {useState, useEffect, useRef} from 'react';
import { useParams } from "react-router-dom"
import { getArticle } from "../../services/dataService.jsx";
import Lotties from "../lotties.jsx";
import no_result from "../../assets/lotties/no_result.json";
import {format_date} from "../helper.jsx";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import {galleryData} from "../../data/gallery.js";
import Gallery from "../Gallery.jsx";

export default function Details () {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id: idParam } = useParams();
    const galleryID = 3


    useEffect(() => {
        try {
            idParam && getArticle(idParam)
                .then((response) => {
                    setArticle(response.data)
                })
                .finally(() => setLoading(false));
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log(article);
    }, [article]);

    return (
        <>

            {
                 article ? (
                     <div className={'mt-5 p-2'}>
                        {/* details*/}
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>N° de dossier : </span> <span className={"fw-bold"}>{article.numero}</span>
                            </div>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>Quantité : </span> <span className={"fw-bold"}>{article.quantity}</span>
                            </div>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>Reste : </span> <span className={"fw-bold"}>{article.reste}</span>
                            </div>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>Reçu le  : </span> <span className={"fw-bold"}> { format_date(article.created_at)} </span>
                            </div>
                            <div className={"col-12"}>
                                <span className={"opacity-75"}>Par </span>
                                <span className={"fw-bold"}>
                                    { `${article.creator.name} ` }
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
                            <Gallery dataImages={galleryData} galleryID={galleryID} />
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
