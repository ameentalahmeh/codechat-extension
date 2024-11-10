/* eslint-disable no-unused-vars */
const vscode = require('vscode');
const { queryLlama, renderWebviewContent } = require('./helpers');

// Sidebar Webview provider class
class CodeChatSidebarProvider {
    resolveWebviewView(webviewView, context, token) {
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.html = renderWebviewContent();

        // Listen for messages from the Webview
        webviewView.webview.onDidReceiveMessage(async (message) => {
            if (message.command === 'startChat') {
                const userInput = message.text;

                // Check if input is valid
                if (userInput.trim()) {
                    try {
                        // Process the input (e.g., send to queryLlama)
                        const response = await queryLlama(userInput);

                        // Send the response back to the Webview
                        webviewView.webview.postMessage({ command: 'response', text: response });
                    } catch (error) {
                        // Handle any errors and send error message to Webview
                        console.error(error);
                        webviewView.webview.postMessage({ command: 'response', text: "Error: Could not process your question." });
                    }
                } else {
                    // Send validation message if input is empty
                    webviewView.webview.postMessage({ command: 'response', text: "Please enter a question!" });
                }
            }
        });
    }
}

// Activate function
function activate(context) {
    console.log('Extension "codechat" is now active!');

    // Register the sidebar view provider
    const codeChatSidebarProvider = new CodeChatSidebarProvider();
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('codeChatView', codeChatSidebarProvider)
    );

    // Register Hello World command
    const helloWorld = vscode.commands.registerCommand('codechat.helloWorld', function () {
        vscode.window.showInformationMessage('Hello World from Code Chat!');
    });

    context.subscriptions.push(helloWorld);
}

// Deactivate function
function deactivate() { }

module.exports = {
    activate,
    deactivate
};
