import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000);
	const isDevelopment = vscode.env.sessionId === 'someValue.sessionId';
	const icon = isDevelopment ? '$(debug)' : '$(icon-fire)';
	const name = vscode.workspace.name;
	if (name) {
    	myStatusBarItem.text = `${icon} Twitter`;
    	myStatusBarItem.show();
	}
	const myCommandId = 'test.helloOriginal';
	myStatusBarItem.command = myCommandId;
	myStatusBarItem.tooltip = `status bar item tooltip`;
	context.subscriptions.push(myStatusBarItem);


	
	console.log('Congratulations, your extension "test" is now active!');

	let disposable = vscode.commands.registerCommand('test.helloWorld', () => {
		var item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);

		let printDate = function () {
			var date = new Date();
			item.text = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
			item.show();
		};
	
		setInterval(printDate,100);

		vscode.window.showInformationMessage('Hello World from test!');
	});
	context.subscriptions.push(disposable);


	let helloOriginal = vscode.commands.registerCommand('test.helloOriginal', () => {
		if (name) {
			myStatusBarItem.text = `$(sync~spin) 読み込み中`;
			myStatusBarItem.show();
		}

		var fs=require("fs");
		var path = require('path');
		const content = '{"phrase":"Professionally Plagiarize High-quality Ideas"}';
		const filePath = path.join(vscode.workspace.rootPath, 'twitter.json');
		fs.writeFileSync(filePath, content, 'utf8');

		const openPath = vscode.Uri.file(filePath);
			vscode.workspace.openTextDocument(openPath).then(doc => {
    vscode.window.showTextDocument(doc);
		});

		vscode.window.showInformationMessage('ようこそSyskenへ');
	});
	context.subscriptions.push(helloOriginal);

}

export function deactivate() {}
