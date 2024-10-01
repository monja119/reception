import React, {useState, useEffect, useRef} from 'react';
import {createConteneur, getNumeroDossier, sendImage, deleteConteneur} from '../../services/dataService.jsx';
import { notifyError, notifySucess } from '../notificationManager.jsx';
import Gallery from "../Gallery.jsx";
import {formBlob, formData} from "../helper.jsx";

const defaultArticle = (user) => {
    return {
        creator_id : user?.id,
        numero : '',
        quantity : '',
        reste : '',
    }
}

export default function CreateArticle ({ user }) {
    const [article, setArticle] = useState(defaultArticle(user));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [numero, setNumero] = useState('');
    const [numeroDossier, setNumeroDossier] = useState([]);
    const [hideList, setHideList] = useState(true);
    const ulRef = useRef(null);
    const [images, setImages] = useState([]);

    const handleChange = (name, value, source=null) => {
        if(source && name === 'numero') {
            setNumero(value);
            setHideList(true);
        }
        else if(!source && name === 'numero') {
            setNumero('')
        }
        setArticle({ ...article, [name]: value });
    }

    const handleImage = (e) => {
        const files = e.target.files;
        if(files.length > 0) {
            let new_data = [];
             Array.from(files).map((file) => {
                // if not image
                if(!file.type.includes('image')) {
                    notifyError('Fichier non valide');
                }
                else {
                    // if image
                    const imageData = URL.createObjectURL(file)
                    new_data.push({
                        data : imageData,
                    });
                }
            });

            setImages([...images, ...new_data]);
        }
    }

    const initData = () => {
        setArticle(defaultArticle(user));
        setNumero('');
        setNumeroDossier([]);
        setHideList(true);
    }


    const saveArticle = () => {
        setError('');
        setLoading(true);

        if(numero === '')
        {
            notifyError('Numéro de dossier non valide');
            setLoading(false);
            return;
        }

        if(article.quantity === '') {
            notifyError('Veuillez remplir le champ nombre');
            setLoading(false);
            return;
        }

        let data = {
            creator_id : article.creator_id,
            numero : numero,
            quantity : article.quantity,
            reste : article.reste === '' ? 0 : article.reste,
        }

        data = formData(data)
        createConteneur(data)
            .then(async (res) => {
                //sending images
                let conteneur = 0
                await images.forEach((image, i) => {
                    // getting blob
                    formBlob(image.data)
                        .then((image) => {
                            const data = {
                                creator_id : user.id,
                                conteneur_id : res.data.article.id,
                                conteneur_numero : numero,
                                data : image,
                                index : i,
                                extension : image.type.split('/')[1]
                            }
                            sendImage(formData(data))
                                .then((res) => {
                                    console.log(res);
                                    conteneur++;
                                    if(conteneur === images.length) {
                                        setArticle(defaultArticle(user))
                                        setImages([]);
                                        notifySucess('Reception validée');
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                    // delete conteneur
                                    deleteConteneur(res.data.article.id)
                                        .then((res) => {
                                            notifyError("Conteneur annulé");
                                        })

                                })
                        })
                })
            })
            .catch((error) => {
                console.error(error);
                notifyError(error.response ? error.response.data.message : "Erreur lors de la création ");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const addImage = () => {
        const input = document.getElementById('inputImage');
        input.click();
        input.onchange = (e) => {
            handleImage(e);
        }
    }

    const removeImage = (index) => {
        const newImages = images.filter((image) => image.index !== index);
        setImages(newImages);
    }

    useEffect(() => {
        if(images && images.length > 0) {
            // re indexing
            images.forEach((image, index) => {
                image.index = index || 0;
            })
            setImages(images);
            console.log(images);
        }
    }, [images]);

    useEffect(() => {
        article.numero !== '' && getNumeroDossier(article.numero)
            .then((response)=>{
                const data = response.data.data;
                data && setNumeroDossier(data)
            })
            .catch((error) => {
                console.error(error);
            })
    }, [article.numero]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setHideList(true);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [setHideList]);


    return (
        <>
            <div className="row justify-content-center " style={{height : '75vh'}}>
                <div className="login-box col-11 p-2">
                    <div className="login-logo text-center mt-5">
                        <h2
                            className="mb-2 mt-3"
                        >
                            Nouvelle Réception
                        </h2>
                    </div>
                    <div className="card border-0 shadow mt-5">
                        <div className="card-body login-card-body">
                            {error && <p className="alert alert-danger"> error </p>}

                            <div className="input-group mt-3">
                                <input type="text"
                                       className={`form-control ${article.numero === '' ? '' : numero === '' ? 'is-invalid' : 'is-valid'}`}
                                       placeholder="N° dossier"
                                       value={article.numero}
                                       onChange={(e) => {
                                           handleChange('numero', e.target.value)
                                           setHideList(false)
                                       }}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text h-100">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>

                            <ul
                                className="list-dossier list-group"
                                hidden={hideList}
                                ref={ulRef}
                            >
                                {numeroDossier.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="list-group-item cursor-pointer"
                                            onClick={() => handleChange('numero', item.SHIPUID_0, 'list')}
                                        >
                                            {item.SHIPUID_0}
                                        </li>
                                    )
                                })}
                            </ul>

                            <div className="input-group mb-3 mt-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Nombre"
                                    value={article.quantity}
                                    onChange={(e) => handleChange('quantity', e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text h-100">
                                        <span className="fas fa-sort-numeric-down"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Reste"
                                    value={article.reste}
                                    onChange={(e) => handleChange('reste', e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text h-100">
                                        <span className="fas fa-sort-numeric-down"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column mb-3">
                                <button
                                    onClick={addImage} className={'btn btn-sm primary-button rounded mb-1'}
                                    style={{width: '200px'}}
                                >
                                    Ajouter une image
                                </button>
                                <span className="text-muted small">Fichier de type image</span>
                                <input id="inputImage" type={'file'} hidden accept={'image/*'} multiple={true}/>
                                <div style={{
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                }}>
                                    {  images.length > 0 &&
                                        <Gallery
                                            dataImages={images}
                                            hideTrash={false}
                                            onRemoveImage={removeImage}
                                        />
                                    }
                                </div>
                            </div>

                            <div className="row justify-content-end mb-3 mt-2">
                                <div className="col-lg-2 col-xl-2 col-6 row f-flex flex-row align-content-end justify-content-end">
                                    <button
                                        className="btn btn-danger"
                                        onClick={initData}
                                        disabled={loading}
                                    >
                                        Annuler
                                    </button>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-6">
                                    <button
                                        className="btn btn-sm  primary-button w-100"
                                        onClick={saveArticle}
                                        disabled={loading}
                                    >
                                        {loading ? "Chargement..." : "Valider"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

