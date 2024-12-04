const axios = require('axios');
const https = require('https');

const BASE_URL = 'http://localhost:5051';

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function login() {
    const response = await axios.post(`${BASE_URL}/auth/login-not-secure`, {
        email,
        password
    }, {
        httpsAgent: agent
    });

    return response.data;
}

async function getCookie() {
    const response = await login();
    return response.token;
}

getCookie().then(cookie => {
    console.log(cookie);
}).catch(error => {
    console.error(error);
});