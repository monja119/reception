import React, { useState, useEffect } from 'react';
import { createArticle } from '../../services/dataService.jsx';
import { notifyError, notifySucess } from '../../components/notificationManager.jsx';
const defaultArticle = (user) => {
    return {
        creator_id : user?.id,
        numero : '',
        quantity : 1,
        reste : 0,
    }
}

export default function CreateArticle ({ articles, setArticles, user }) {
    const [article, setArticle] = useState(defaultArticle(user));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (name, value) => {
        setArticle({ ...article, [name]: value });
    }

    const saveArticle = () => {
        setError('');
        setLoading(true);
        if(article.numero === '' || article.quantity === '' || article.reste === '') {
            notifyError('Veuillez remplir tous les champs');
            setLoading(false);
            return;
        }

        if(article.quantity < article.reste) {
            notifyError('La quantité ne peut pas être inférieure au reste');
            setLoading(false);
            return;
        }

        createArticle(article)
            .then((res) => {
                let newArticles = [...articles];
                newArticles.push(res.data.article);
                setArticles(newArticles);
                notifySucess('Article créé');
            })
            .catch((error) => {
                console.error(error);
                notifyError(error.response ? error.response.data.message : "Erreur lors de la création ");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className={'col-xl-6 col-lg-6 col-sm-12 col-md-12 p-1 mt-2'}>
            <div className={'row w-100 gap-1 justify-content-center flex-nowrap'}>
                <input
                    type="text"
                    className="col-4 rounded border border-opacity-50"
                    style={{ height: '39px' }}
                    placeholder="Numéro"
                    value={article.numero}
                    onChange={(e) => handleChange('numero', e.target.value)}
                />
                <input
                    type="number"
                    className=" col-3 rounded border border-opacity-50"
                    placeholder="Quantité"
                    value={article.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                />
                <input
                    type="number"
                    className=" col-3 rounded border border-opacity-50"
                    placeholder="Reste"
                    value={article.reste}
                    onChange={(e) => handleChange('reste', e.target.value)}
                />
                <button
                    className="btn btn-primary col-1 btn-sm small"
                    style={{minWidth : '100px'}}
                    onClick={saveArticle}
                    disabled={loading}
                >
                    Créer
                </button>
            </div>
        </div>
    );
}
