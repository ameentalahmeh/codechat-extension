// Function to provide HTML content for the sidebar
function renderWebviewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Code Chat Sidebar</title>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
            <script src="https://cdn.jsdelivr.net/npm/marked@latest/marked.min.js"></script>
            <style>
                #chatbox {
                    flex-grow: 1;
                    overflow-y: auto;
                    margin-bottom: 10px;
                    padding: 15px;
                }
                .user-message {
                    margin: 3% 0;
                    background-color: #4caf50;
                    color: white;
                    border-radius: 10px;
                    align-self: flex-end;
                    padding: 10px;
                    max-width: 100%;
                    word-wrap: break-word;
                }
                .llama-message {
                    margin: 3% 0;
                    background-color: #f1f1f1;
                    color: #333;
                    border-radius: 10px;
                    align-self: flex-start;
                    padding: 10px;
                    max-width: 100%;
                    word-wrap: break-word;
                }
                .typing {
                    color: #888;
                    font-style: italic;
                    margin-bottom: 10px;
                }
                code {
                    color: white;
                    padding: 3px;
                }
                pre {
                    position: relative;
                }
                pre code {
                    background-color: #f8f9fa;
                    padding: 10px;
                    display: block;
                    border-radius: 5px;
                    font-size: 0.9em;
                    overflow-x: auto;
                }
                .copy-icon {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                    color: #6c757d;
                    font-size: 1.2em;
                }
                .copy-icon:hover {
                    color: #000;
                }
            </style>
        </head>
        <body class="d-flex flex-column vh-100 bg-light">
            <div class="container text-center my-4">
                <h2>Coding Chat with AI</h2>
            </div>
            <div id="chatbox" class="container d-flex flex-column"></div>
            <div class="container my-3 d-flex justify-content-center">
                <input type="text" id="userInput" class="form-control mr-2" placeholder="E.g. How to build NodeJs API?" style="width: 80%;">
                <button id="sendButton" class="btn btn-success" onclick="sendMessage()">Send</button>
            </div>
            <script>
                const vscode = acquireVsCodeApi();

                function appendMessage(message, type) {
                    const messageElement = document.createElement('div');
                    messageElement.className = type === 'user' ? 'user-message' : 'llama-message';
                    messageElement.innerHTML = message;
                    document.getElementById('chatbox').appendChild(messageElement);
                    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;

                    addCopyIcons();
                }

                function showTypingEffect() {
                    const typingElement = document.createElement('div');
                    typingElement.className = 'typing';
                    typingElement.innerHTML = "Llama is typing...";
                    document.getElementById('chatbox').appendChild(typingElement);
                    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
                    return typingElement;
                }

                function sendMessage() {
                    const userInput = document.getElementById('userInput').value;
                    if (userInput.trim()) {
                        appendMessage(userInput, 'user');
                        document.getElementById('sendButton').disabled = true;
                        document.getElementById('userInput').disabled = true;
                        const typingEffect = showTypingEffect();
                        vscode.postMessage({ command: 'startChat', text: userInput });
                        document.getElementById('userInput').value = '';
                    } else {
                        appendMessage("Please enter a question!", 'llama');
                    }
                }

                window.addEventListener('message', event => {
                    const message = event.data;
                    if (message.command === 'response') {
                        const typingElement = document.querySelector('.typing');
                        if (typingElement) typingElement.remove();
                        const markdown = message.text;
                        const html = marked.parse(markdown);
                        appendMessage("Llama says:<br>" + html, 'llama');
                        document.getElementById('sendButton').disabled = false;
                        document.getElementById('userInput').disabled = false;
                    }
                });

                function addCopyIcons() {
                    document.querySelectorAll('pre code').forEach((codeBlock) => {
                        const copyIcon = document.createElement('i');
                        copyIcon.className = 'fas fa-copy copy-icon';

                        copyIcon.addEventListener('click', () => {
                            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                                copyIcon.style.color = '#28a745'; // Change color to green to indicate success
                                setTimeout(() => {
                                    copyIcon.style.color = '#6c757d'; // Revert color back to original
                                }, 2000);
                            }).catch((err) => {
                                console.error('Failed to copy: ', err);
                            });
                        });

                        codeBlock.parentNode.insertBefore(copyIcon, codeBlock);
                    });
                }

                // Call addCopyIcons() initially if there are any existing code blocks
                addCopyIcons();
            </script>
        </body>
        </html>
    `;
}


module.exports = renderWebviewContent;
