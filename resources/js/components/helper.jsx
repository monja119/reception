import React from 'react';
let gmt = 3

//
export const format_date = (date) => {
    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


export const extract_page = (pagination_url) => {
    if(!pagination_url) return 1;
    const url = new URL(pagination_url);
    return parseInt(url.searchParams.get('page'));
}


export const formData = (data) => {
    const formData = new FormData();
    for (let key in data) {
        if (key === "images") {
            // Ajoutez chaque image séparément
            data[key].forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });
        } else {
            formData.append(key, data[key]);
        }
    }
    return formData;
}
