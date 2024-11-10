const axios = require('axios');

// Modify this function to talk to your Python backend
async function queryLlama(prompt) {
    try {
        const response = await axios.post('http://localhost:8000/api/prompt/', prompt);
        return response.data.result;
    } catch (error) {
        console.error(error);
        throw new Error("Error communicating with the AI backend");
    }
}

module.exports = queryLlama;
