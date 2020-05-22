const axios = require('axios');

// api reference (origin https://radbot-api.herokuapp.com/)
const api = axios.create({
    baseURL: 'https://api.radiobrasil.site/',
});

module.exports = api;
