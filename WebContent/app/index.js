require.config({
	paths: {
		'text': 'lib/text',
		'domReady': 'lib/domReady',
		'i18n': 'lib/i18n',
		'jquery': 'lib/jquery-2.1.4.min',
		'jquery.ui': 'lib/jquery-ui-1.11.4.custom/jquery-ui.min',
		'jquery.bootstrap': 'lib/bootstrap-3.3.5/js/bootstrap.min',
		'jqGrid': 'lib/Guriddo_jqGrid_JS_5/js/jquery.jqGrid.min',
//		'datatables': 'lib/DataTables/datatables.min',
//		'w2ui': 'lib/w2ui-1/w2ui-1.4.3.min',
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
		'jqGrid': {
			deps: ['jquery']
		}
//		'datatables': {
//			deps: ['jquery']
//		}
//		'w2ui': {
//			deps: ['jquery'],
//			exports: ['w2ui', 'w2obj']
//		}
	}
});

require([
         'js/global'
], function (global) {
	// ほんとは、ここでいろいろとinitializeな処理が必要、なはず
	// ・ブラウザーチェックとか？
	// ・アラート表示用グローバルメソッドの作成
	// ・ローディングオーバーレイ表示用グローバルメソッドの作成

	// main画面読み込み (main画面に関する処理は、main.jsで実装する)
	// 注: 本来は、ここでログイン画面を読み込む。
	//     ログイン画面でログインに成功したら、main画面を読み込む
	require(['js/login']);
//	require(['js/main']);
});