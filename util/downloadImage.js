const axios = require('axios');
const fs = require('fs');
const path = require('path');

let downloadImageAndConvertToBlob = async (url) => {
    try {
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'arraybuffer'
        });
        return response.data;
    } catch (error) {
        console.error('Error al descargar la imagen:', error);
        return null
    }
}

module.exports = {downloadImageAndConvertToBlob}