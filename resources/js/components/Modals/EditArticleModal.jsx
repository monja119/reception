import React, {useState, useEffect, useRef} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateArticle, getNumeroDossier } from "../../services/dataService.jsx";
import { notifyError, notifySucess} from "../notificationManager.jsx";

const defaultArticle = (article) => {
    return {
        id : article?.id,
        numero : article?.numero,
        quantity : article?.quantity,
        reste : article?.reste,
    }
}

const defaultData = {
    id: '',
    numero: '',
    quantity: '',
    reste: '',
}

export default function UpdateUserModal ({ index, article, articles, setArticles, show, handleClose }) {
    const [data, setData] = useState(defaultData);
    const init_numero = article?.numero;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [numero, setNumero] = useState(init_numero);
    const [numeroDossier, setNumeroDossier] = useState([]);
    const [hideList, setHideList] = useState(true);
    const ulRef = useRef(null);

    const handleChange = (name, value, source=null) => {
        if(source && name === 'numero') {
            setNumero(value);
            setHideList(true);
        }
        else if(!source && name === 'numero') {
            value === init_numero ? setNumero(init_numero) : setNumero('')
        }
        setData({ ...data, [name]: value });
    }


    useEffect(() => {
        article && setData(article);
    }, [article]);

    const saveArticle = () => {
        setError('');
        setLoading(true);

        if(numero === '')
        {
            notifyError('Numéro de dossier non valide');
            setLoading(false);
            return;
        }


        if(data.quantity === '') {
            setError('Veuillez remplir le champ nombre');
            setLoading(false);
            return;
        }

        const articleData = {
            id: data.id,
            numero: numero,
            quantity: data.quantity,
            reste: data.reste === '' ? 0 : data.reste,
        }

        updateArticle(articleData)
            .then((res) => {
                // update articles
                let newArticles = [...articles];
                newArticles[index] = res.data.article;
                setArticles(newArticles);
                notifySucess('Article modifié');
                handleClose();
            })
            .catch((error) => {
                console.error(error);
                notifyError(error.response ? error.response.data.message : "Erreur lors de l'ajout de l'utilisateur ");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        data.numero !== '' && getNumeroDossier(data.numero)
            .then((response)=>{
                const res = response.data.data;
                res && setNumeroDossier(res)
            })
            .catch((error) => {
                console.error(error);
            })
    }, [data.numero]);


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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={"text-danger"}>
                        {error}
                    </p>
                    <input
                        type="text"
                        className={`col-4 rounded border border-opacity-50 form-control mt-2 ${data.numero === '' ? '' : data.numero === init_numero ? 'is-valid' :  numero === '' ? 'is-invalid' : 'is-valid' } `}
                        style={{height: '39px'}}
                        placeholder="N° dossier"
                        value={data?.numero}
                        onChange={(e) => {
                            setHideList(false)
                            handleChange('numero', e.target.value)
                        }}
                    />

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

                    <input
                        type="number"
                        className=" col-3 rounded border border-opacity-50 form-control mt-2"
                        placeholder="Nombre"
                        value={data?.quantity}
                        onChange={(e) => handleChange('quantity', e.target.value)}
                    />
                    <input
                        type="number"
                        className=" col-3 rounded border border-opacity-50 form-control mt-2"
                        placeholder="Reste"
                        value={data?.reste}
                        onChange={(e) => handleChange('reste', e.target.value)}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            setData(defaultData)
                            handleClose();
                        }}
                        className={'btn btn-danger'}>
                        Annuler
                    </Button>
                    <Button onClick={saveArticle} className={'btn btn-success'}>
                        Mettre à jour
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
