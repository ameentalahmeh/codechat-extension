const fs = require('fs');
const path = require('path');

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

module.exports = renderWebviewContent;
