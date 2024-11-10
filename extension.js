const vscode = require('vscode');
const { queryLlama, renderWebviewContent } = require('./helpers');

// Sidebar Webview provider class
class CodeChatSidebarProvider {
    resolveWebviewView(webviewView) {
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.html = renderWebviewContent();

        // Listen for messages from the Webview
        webviewView.webview.onDidReceiveMessage(async (message) => {
            if (message.command === 'startChat') {
                try {
                    const { text, model, history } = message;

                    // User query params
                    let userQuery = { text, history };

                    // Add model to query if it's not empty or undefined
                    if (model && model.trim()) {
                        userQuery['model'] = model;
                    }

                    // Process the input (e.g., send to queryLlama)
                    const response = await queryLlama(userQuery);

                    // Send the response back to the Webview
                    webviewView.webview.postMessage({ command: 'response', text: response });
                } catch ({ message: errMsg }) {
                    // Handle any errors and send error message to Webview
                    vscode.window.showErrorMessage(errMsg);
                    webviewView.webview.postMessage({ command: 'response', error: errMsg });
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
