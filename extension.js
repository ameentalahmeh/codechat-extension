const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "codechat" is now active!');

	const helloWorld = vscode.commands.registerCommand('codechat.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from codechat!');
	});

	context.subscriptions.push(helloWorld);


	const startChat = vscode.commands.registerCommand('code-chat.startChat', async function () {
		// Show an input box to the user for native language input
		const userInput = await vscode.window.showInputBox({
			prompt: 'Ask Llama anything (in your native language)',
		});

		if (userInput) {
			// Send the input to the Llama API and get the response
			const response = await queryLlama(userInput);
			// Display the response from Llama as a VS Code information message
			vscode.window.showInformationMessage('Llama says: ' + response);
		} else {
			vscode.window.showInformationMessage("No input provided. Please try again.");
		}
	});

	context.subscriptions.push(startChat);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
