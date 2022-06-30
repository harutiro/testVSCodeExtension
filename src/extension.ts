import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "test" is now active!');

	let disposable = vscode.commands.registerCommand('test.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from test!');
	});
	context.subscriptions.push(disposable);


	let helloOriginal = vscode.commands.registerCommand('test.helloOriginal', () => {
		vscode.window.showInformationMessage('ようこそSyskenへ');
	});
	context.subscriptions.push(helloOriginal);

}

export function deactivate() {}
