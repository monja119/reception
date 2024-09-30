import axios from 'axios';

export const getArticles = (data) => {
    return axios.get(`/api/articles/`, {
        params: {
            page: data.page,
            search : data.search,
            initial_date : data.initial_date,
            final_date : data.final_date
        }
    })
}


export const createArticle = (data) => {
    return axios.post(`/api/articles`, data);
}

export const updateArticle = (data) => {
    return axios.put(`/api/articles/${data.id}`, data);
}

export const deleteArticle = (id) => {
    return axios.delete(`/api/articles/${id}`);
}

export const getArticle = (id) => {
    return axios.get(`/api/articles/${id}`);
}


export const getNumeroDossier  = (like) => {
    return axios.get(`/api/x3/${like}`);
}

