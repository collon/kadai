require([
         'jquery',
         'text!html/main.html',
         'domReady!'
], function ($, html) {
	// bodyにmain.htmlの内容を貼り付ける
	// TODO: 本来は、ログイン画面の削除が必要なはず
	$(document.body).html(html);
	
	/*
	require(['js/modules/TestModule'], function (TestModule) {
		TestModule();
	});
	/**/
	
	/* テストコード */
	var $btnAdd = $('#btnAdd');
	$btnAdd.on({
		click: function () {
			require([
				'js/global',
				'js/modules/UserInfo'
			], function (g, UserInfo) {
				if (! g.userInfo) {	// この前にuserInfoが生成される可能性がなければ、このifブロックは削除する
					g.userInfo = new UserInfo('miura');
				}
				g.userInfo.getInfo(function (res) {	// ユーザー情報を取得
					// 成功
					// リスト選択メニュー更新
					
					// 前回値も見て、初期表示するリストの情報を取得する
					//  --> 別モジュールにする？
					alert(JSON.stringify(res, null, '\t'));
				}, function () {
					// 失敗
					alert(this.message);
				});
			});
		}
	});
	/**/
	
	// === 以下テストコード ===
	// テストテーブル表示処理
	var $divContent = $('#divContent'),
		_testFirstName = 'Taro',
		_testLastName = 'Soumu',
		_testScore = '77',
		tableContent = '<table class="table table-bordered table-hover">';
	tableContent += '<thead>';
	tableContent += '<tr>';
	tableContent += '<th>No.</th>';
	tableContent += '<th>First Name</th>';
	tableContent += '<th>Last Name</th>';
	tableContent += '<th>Score</th>';
	for (var j = 0; j < 30; ++j) {
		tableContent += '<th>column' + j + '</th>';
	}
	tableContent += '</tr>';
	tableContent += '</thead>';
	tableContent += '<tbody>';
	for (var i = 1; i < 300; ++i) {
		tableContent += '<tr>';
		tableContent += '<td>' + i + '</td>';
		tableContent += '<td>' + _testFirstName + i + '</td>';
		tableContent += '<td>' + _testLastName + i + '</td>';
		tableContent += '<td>' + _testScore + '</td>';
		for (var j = 0; j < 30; ++j) {
			tableContent += '<td>data' + i + '-' + j + '</td>';
		}
		tableContent += '</tr>';
	}
	tableContent += '</tbody>';
	tableContent += '</table>';
	$divContent.html(tableContent);
	
	// アクションのテスト (とりあえずsearchボタンで動作)
	// content-typeをapplication/jsonにすると、サーブレット側での解析が面倒くさそう（まだうまくいってない）
	var $btnSearch = $('#btnSearch');
	$btnSearch.on({
		click: function () {
			$.ajax({
				type: 'POST',
				url: '/kadai/MiuTestServlet',
				contentType: 'application/json',
				headers: {
					'x-custom-action-id': 'getUserInfo'
				},
				data: JSON.stringify({
					arrayUserId: [ 'user01', 'user02' ]
				})
			}).done(function (data) {
				console.log(data);
			});
		}
	});
	
	// JSONICのRPCServletでの通信テスト
	/*
	var $btnAdd = $('#btnAdd');
	$btnAdd.on({
		click: function () {
			$.ajax({
				type: 'POST',
				url: '/kadai/MiuTest.json',
				contentType: 'application/json',
				data: JSON.stringify({
					jsonrpc: '2.0',
					method: 'test01',
					params: null,
					id: 0
				}),
				success: function (res) {
					if (res.error) {
						console.log(res.error.message);
						console.log(res.error.data);
						return;
					}
					console.log(res);
					console.log(res.result);
					alert(JSON.stringify(res.result, null, '\t'))
				}
			});
		}
	});
	*/
});