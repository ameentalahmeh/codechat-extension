# Code Chat - README

Code Chat is a Visual Studio Code extension designed to enhance the developer experience by integrating an AI-powered assistant directly into the editor. Built with Llama AI, Code Chat allows developers to use their native language to ask questions and receive intelligent, context-aware responses. This extension supports both code-related queries and general programming assistance, streamlining the coding workflow by keeping everything within VS Code.

---

## Features

- **Native Language Support**: Interact with the AI in your preferred language, and Code Chat will respond in kind.
- **Multiple AI Models**: Choose from a selection of powerful Llama models, such as:
  - Llama-3.2-11B for extensive knowledge and versatility
  - Meta-Llama-3.1-8B for optimal speed
  - CodeLlama-34b for code-specific support
- **Chat History**: Keep track of past conversations for easy reference.
- **Interactive Sidebar**: Code Chat appears as a sidebar where you can initiate chats, review history, and access saved conversations.
- **Copy Code Functionality**: Easily copy AI-generated code snippets to your clipboard for quick integration.

## Future Work

- **Web Version**: Convert to a standalone web app.
- **Optimization**: Enhance performance and reduce latency.
- **Additional Models**: Support more AI models.
- **UI Customization**: Enable theme and layout personalization.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Search for "Code Chat" and install it.

Alternatively, you can install it from the VSIX file if available.

## Usage

1. After installation, locate the Code Chat icon in the Activity Bar.
2. Click the icon to open the Code Chat sidebar.
3. Start a new chat by typing your question or request in the input field and choosing a preferred model.
4. View past chats by clicking on the **History** button.

### Commands

- **Hello** (`codechat.helloWorld`): Displays a simple greeting message.
- **Start Code Chat** (`codechat.startChat`): Opens a new chat session with the AI.

## Requirements

- Visual Studio Code version `^1.95.0` or later.
- Internet connection for querying models.
- The **Code Chat server** should be up and running to handle the requests and responses from the extension.

## Project Structure

- **`extension.js`**: Main extension file, responsible for handling commands and initializing the sidebar.
- **`index.html`**: The HTML structure for the sidebar's webview, containing chat input, chat history, and AI model selection.
- **`assets/icons`**: Icons for the extension.
- **`helpers/llamaHelper.js`**: Handles interactions with the Llama AI models. This helper file includes functions to send prompts to the Llama API, process responses, handle errors, and manage model selection and configuration parameters. It serves as the bridge between the extension’s front-end and the AI, ensuring smooth querying and response handling for the chat interface.

## Running and Testing the Extension Locally

To run and test the extension locally in Visual Studio Code:

1. **Install Dependencies**:
   - Open the project folder in VS Code.
   - Run the following command in the terminal to install required dependencies:
     ```bash
     npm install
     ```

2. **Start the Code Chat Server**:
   - Ensure the Code Chat server is running and accessible. This is essential for the extension to process queries and receive responses from the models.

3. **Run in Debug Mode**:
   - Press `F5` to launch the extension in a new VS Code Extension Development Host window. This allows you to run and debug the extension as if it were installed.

4. **Test the Extension**:
   - In the development host window, activate the extension's features by using its commands or navigating to the sidebar where the extension’s UI appears.
   - Interact with the chat input, model selection, and other UI elements to verify the functionality.

5. **Make Changes and Re-run**:
   - If you make changes, close the development host window, then press `F5` again in your main VS Code window to relaunch with the updated code.

Following these steps will ensure the extension is set up correctly, dependencies are installed, and the extension is running with the necessary server support for testing and debugging before deployment.

