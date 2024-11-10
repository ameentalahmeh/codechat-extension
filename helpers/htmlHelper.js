const fs = require('fs');
const path = require('path');

const chatsFilePath = path.join(__dirname, '..', 'chats.json');

// Render sidebar view
function renderWebviewContent() {
    // Specify the path to your HTML file
    const basePath = path.join(__dirname, '..', 'public/');
    const htmlPath = basePath + "index.html";
    const cssPath = basePath + "styles.css";

    // Read the HTML file content
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Replace placeholders with the correct URIs for the webview
    const fullHtmlContent = htmlContent
        .replace(`<link rel="stylesheet" href="styles.css">`, `<style>\n${cssContent.toString()}\n</style>`);

    // Return the HTML content as a string
    return fullHtmlContent;
}


// Save chat to chats.json, replacing existing chat if it exists
function saveChatToFile(chat) {
    const chats = loadChats(); 
    const existingChatIndex = chats.findIndex(c => c.id === chat.id);
    if (existingChatIndex !== -1) {
        chats[existingChatIndex] = chat;
    } else {
        chats.push(chat);
    }
    fs.writeFileSync(chatsFilePath, JSON.stringify(chats, null, 2));
}

// Load chats from chats.json
function loadChats() {
    if (fs.existsSync(chatsFilePath)) {
        const data = fs.readFileSync(chatsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

module.exports = { renderWebviewContent, saveChatToFile, loadChats };
