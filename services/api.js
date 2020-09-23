const axios = require('axios');

// api reference (origin https://api.radiobrasil.site/)
const api = axios.create({
    baseURL: 'http://localhost:8080',
});

module.exports = api;
