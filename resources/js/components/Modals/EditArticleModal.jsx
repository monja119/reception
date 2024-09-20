import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateArticle } from "../../services/dataService.jsx";
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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (name, value) => {
        console.log(data)
        setData({ ...data, [name]: value });
    }


    useEffect(() => {
        article && setData(article);
    }, [article]);

    const saveArticle = () => {
        setError('');
        setLoading(true);
        if(data.numero === '' || data.quantity === '' || data.reste === '') {
            setError('Veuillez remplir tous les champs');
            setLoading(false);
            return;
        }

        if(parseInt(data.quantity) < parseInt(data.reste)){
            notifyError('La quantité ne peut pas être inférieure au reste');
            setLoading(false);
            return;
        }
        const articleData = {
            id: data.id,
            numero: data.numero,
            quantity: data.quantity,
            reste: data.reste,
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


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={"text-danger"}>
                        {error}
                    </p>
                    <input
                        type="text"
                        className="col-4 rounded border border-opacity-50 form-control mt-2"
                        style={{height: '39px'}}
                        placeholder="Numéro"
                        value={data?.numero}
                        onChange={(e) => handleChange('numero', e.target.value)}
                    />
                    <input
                        type="number"
                        className=" col-3 rounded border border-opacity-50 form-control mt-2"
                        placeholder="Quantité"
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
