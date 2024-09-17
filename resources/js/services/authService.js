import axios from 'axios';

export const login = (data) => {
    return axios.post(`/api/auth/login`, data);
}

export const logout = (token) => {
    return axios.get(`/api/auth/logout/${token}`);
}

// update status
export const activateUser = (data) => {
    return axios.put(`/api/users/activate/${data.id}`, data);
}


export const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}
