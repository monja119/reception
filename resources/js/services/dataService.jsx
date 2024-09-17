import axios from 'axios';

export const getArticles = () => {
    return axios.get(`/api/articles/`);
}

export const findArticle = (numero) => {
    return axios.get(`/api/articles/${numero}`);
}

export const createArticle = (data) => {
    return axios.post(`/api/articles`, data);
}
