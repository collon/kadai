$(function () {
	// モジュール分割する

	// ほんとは、ここでいろいろとinitializeな処理が必要、なはず
	// ブラウザーチェックとか？
	// その他、このアプリを使用できない場合のチェック処理

	// main画面読み込み (main画面に関する処理は、main.jsで実装する)
	// 注: 本来は、ここでログイン画面を読み込む。
	//     ログイン画面でログインに成功したら、main画面を読み込む
	$.getScript('./js/main.js');
});