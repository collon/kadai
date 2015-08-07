require([
         'dojo/_base/window',
         'dojo/dom',
         'dojo/dom-construct',
         'dojo/parser',
         'dojo/ready',
         'dojo/text!app/main.html'
], function (win, dom, domConstruct, parser, ready, html) {
	
	// メイン画面を構築
	domConstruct.destroy(dom.byId('divLoading'));	// loading... を削除
	domConstruct.place(domConstruct.toDom(html), win.body());	// main.htmlをdom化して、bodyに配置
	parser.parse();	// ウィジェット構築
	
	// ウィジェットの構築を待って、ウィジェットに処理を実装する
	ready(function () {
		
	});
});