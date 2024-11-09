const vscode = require('vscode');
const axios = require('axios');

// Modify this function to talk to your Python backend
async function queryLlama(prompt) {
    try {
        const response = await axios.post('http://localhost:8000/api/prompt/', {
            prompt: prompt,
        });
        console.log(response.data.result);
        return response.data.result;
    } catch (error) {
        vscode.window.showErrorMessage("Error communicating with the AI backend." + error);
        return "Error";
    }
}

module.exports = queryLlama;
