require.config({
	paths: {
		'text': 'lib/text',
		'domReady': 'lib/domReady',
		'i18n': 'lib/i18n',
		'jquery': 'lib/jquery-2.1.4.min',
		'jquery.ui': 'lib/jquery-ui-1.11.4.custom/jquery-ui.min',
		'jquery.bootstrap': 'lib/bootstrap-3.3.5/js/bootstrap.min',
		'datatables': 'lib/DataTables/datatables.min',
		'js': 'js',
		'html': 'html'
	},
	shim: {
		'jquery.bootstrap': {
			deps: ['jquery']
		},
		'jquery.ui': {
			deps: ['jquery']
		},
		'datatables': {
			deps: ['jquery']
		}
	}
});

require([
], function () {
	// ほんとは、ここでいろいろとinitializeな処理が必要、なはず
	// ブラウザーチェックとか？
	// その他、このアプリを使用できない場合のチェック処理

	// main画面読み込み (main画面に関する処理は、main.jsで実装する)
	// 注: 本来は、ここでログイン画面を読み込む。
	//     ログイン画面でログインに成功したら、main画面を読み込む
	require(['js/login']);
//	require(['js/main']);
});