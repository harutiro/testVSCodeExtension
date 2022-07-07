import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000);
	const isDevelopment = vscode.env.sessionId === 'someValue.sessionId';
	const icon = isDevelopment ? '$(debug)' : '$(icon-fire)';
	const name = vscode.workspace.name;
	if (name) {
    	myStatusBarItem.text = `${icon} ${name}`;
    	myStatusBarItem.show();
	}
	const myCommandId = 'test.helloOriginal';
	myStatusBarItem.command = myCommandId;
	myStatusBarItem.tooltip = `status bar item tooltip`;
	context.subscriptions.push(myStatusBarItem);


	
	console.log('Congratulations, your extension "test" is now active!');

	let disposable = vscode.commands.registerCommand('test.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from test!');
	});
	context.subscriptions.push(disposable);


	let helloOriginal = vscode.commands.registerCommand('test.helloOriginal', () => {
		if (name) {
			myStatusBarItem.text = `$(sync~spin) ${icon} ${name}`;
			myStatusBarItem.show();
		}
		vscode.window.showInformationMessage('ようこそSyskenへ');
	});
	context.subscriptions.push(helloOriginal);

}

export function deactivate() {}
