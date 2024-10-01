import axios from 'axios';

export const getConteneurs = (data) => {
    return axios.get(`/api/conteneurs/`, {
        params: {
            page: data.page,
            search : data.search,
            initial_date : data.initial_date,
            final_date : data.final_date
        }
    })
}


export const createConteneur = (data) => {
    return axios.post(`/api/conteneurs`, data);
}

export const updateConteneur = (data) => {
    return axios.put(`/api/conteneurs/${data.id}`, data);
}

export const deleteConteneur = (id) => {
    return axios.delete(`/api/conteneurs/${id}`);
}

export const        getConteneur = (id) => {
    return axios.get(`/api/conteneurs/${id}`);
}


export const getNumeroDossier  = (like) => {
    return axios.get(`/api/x3/${like}`);
}


export const sendImage = (data) => {
    return axios.post(`/api/images`, data);
}

export const deleteImage = (id) => {
    return axios.delete(`/api/images/${id}`);
}

export const getImages = (id) => {
    return axios.get(`/api/images/${id}`);
}

export const getConteneurImages = (id) => {
    return axios.get(`/api/conteneur/${id}/images`);
}

