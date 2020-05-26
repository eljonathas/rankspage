const axios = require('axios');

// api reference (origin https://api.radiobrasil.site/)
const api = axios.create({
    baseURL: 'https://api.radiobrasil.site',
});

module.exports = api;
