import * as vscode from 'vscode';
import axios from 'axios';

// ApiからJsonをもらう時に、型を指定する
type password ={
	phrase: string;
};

// type GetUsersResponse = {
// 	data: password[];
// };

//実際にApiを叩く部分
async function getPass(): Promise<string> {
	try{
		//ここで、Apiを叩いて、パースもしてくれている
		const { data, status } = await axios.get<password>(
				'https://corporatebs-generator.sameerkumar.website/',
				{
					headers: {
					Accept: 'application/json',
				},
			},
		);

		//パースしたデータを逆にJsonに戻している
		console.log(JSON.stringify(data, null, 4));

		//パースしたデータをコンソールに流す
		console.log(data.phrase);

		//APiを取得した時の状態を表示してくれている
		//成功したら200を返してくれる。
		//ページがなかったときは404とか
		console.log('response status is: ', status);
		return JSON.stringify(data, null, 4);
	}catch(error){
		console.log('error');
		return 'error';
	}
	
}

export function activate(context: vscode.ExtensionContext) {

	//Vscodeの下に表示されているステータスバーに新たな要素を表示してくれる
	const myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000);
	const isDevelopment = vscode.env.sessionId === 'someValue.sessionId';
	//ここでアイコンの指定をしている
	const icon = isDevelopment ? '$(debug)' : '$(icon-fire)';
	const name = vscode.workspace.name;
	//何かしらのファイルが開かれているときじゃないと、表示されないようにいする
	if (name) {
		//ここでステータスバーの文字列を指定している
		myStatusBarItem.text = `${icon} Twitter`;
		myStatusBarItem.show();
	}
	//ボタンを押された時にどんなコマンんどを実行するか記載する
	const myCommandId = 'test.helloOriginal';
	myStatusBarItem.command = myCommandId;
	//マウスをかざした時のヒントを表示する
	myStatusBarItem.tooltip = `status bar item tooltip`;
	context.subscriptions.push(myStatusBarItem);


	
	console.log('Congratulations, your extension "test" is now active!');

	let disposable = vscode.commands.registerCommand('test.helloWorld', () => {
		//ここは、1秒に一回時間取得を読んでくれる部分
		//本番では、2分に一回盛り上がり度を取得するコードに変更する
		var item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
		let printDate = function () {
			var date = new Date();
			item.text = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
			item.show();
		};
		//ここで間隔を指定している
		setInterval(printDate,100);

		vscode.window.showInformationMessage('Hello World from test!');
	});
	context.subscriptions.push(disposable);


	let getJson = vscode.commands.registerCommand('test.getJson', () => {
		//上のメラメラアイコンを押した時にJSonを取得するコード
		getPass();
		vscode.window.showInformationMessage('Jsonを取得するよ');
	});
	context.subscriptions.push(getJson);



	let helloOriginal = vscode.commands.registerCommand('test.helloOriginal', () => {
		//ワークスペースが開かれていない時に動くとエラーが出るので、IF文を用いる
		if (name) {
			//ボタンを押された時に表示を変更したいため、ここでもTextを変更させる
			myStatusBarItem.text = `$(sync~spin) 読み込み中`;
			myStatusBarItem.show();

			//getPassからpromiseの型を返してもらう
			const getPromise = getPass();

			//プロミスは度非同期処理を行うタイミングで、ちゃんと処理が終了したタイミングで動作をしてくれる関数。
			getPromise.then(data => {
				//ここからファイルを作成して、表示するコード
				var fs=require("fs");
				var path = require('path');
				//ファイルの作るパスとファイル名をしている
				const filePath = path.join(vscode.workspace.rootPath, 'twitter.json');
				//実際のファイルの中身を作成する
				fs.writeFileSync(filePath, data, 'utf8');
				const openPath = vscode.Uri.file(filePath);
				//VSCodeで開いてもらう
				vscode.workspace.openTextDocument(openPath).then(doc => {
					vscode.window.showTextDocument(doc);
				});

				//処理が終了したらステータスバーの見た目を元に戻す
				myStatusBarItem.text = `${icon} Twitter`;
				myStatusBarItem.show();
			}, (error) => {
				console.error("error:", error.message);
				//処理が終了したらステータスバーの見た目を元に戻す
				myStatusBarItem.text = `${icon} Twitter`;
				myStatusBarItem.show();
			});

			
		}

		

		vscode.window.showInformationMessage('JsonをTextに貼り付けたよ');
	});
	context.subscriptions.push(helloOriginal);

}

export function deactivate() {}
