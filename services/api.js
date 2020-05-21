const axios = require('axios');

const api = axios.create({
    baseURL: 'https://radbot-api.herokuapp.com',
});

module.exports = api;