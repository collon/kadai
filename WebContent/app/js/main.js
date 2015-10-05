require([
	'jquery',
	'jquery.bootstrap',
	'text!html/main.html',
	'domReady!'
], function ($, bootstrap, html) {
	// bodyにmain.htmlの内容を貼り付ける(replace)
	$(document.body).html(html);
	
	/*
	require(['js/modules/TestModule'], function (TestModule) {
		TestModule();
	});
	/**/
	
	// === 以下テストコード ===
	
	/* 通信テスト */
	var $btnAdd = $('#btnAdd');
	$btnAdd.on({
		click: function () {
			require([
				'js/global',
				'js/modules/UserInfo'
			], function (g, UserInfo) {
				if (! g.userInfo) {	// この前にuserInfoが生成される可能性がなければ、このif文は削除する
					g.userInfo = new UserInfo('test');
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
	
	// test grid jqgrid
	var $btnTest01 = $('#btnTest01');
	var $btnTest02 = $('#btnTest02');
	var $btnTest03 = $('#btnTest03');
	
	$btnTest01.on({
		click: function () {
			/*
			 * リスト選択時のテスト
			 * ・カラム情報取得
			 * ・初回表示情報取得
			 */
			require([
			         'jqGrid',
			         'js/global',
			         'js/modules/List'
			], function (jqGrid, g, List) {
				/**
				 * TODO 複数のリストをどう保持するか？
				 */
//				var list = new List("hoge01");
//				list.getColumnInfo(function (columnInfo) {
//					// 成功
//					$('#tblGrid').jpGrid({
//					});
//				},
//				function () {
//					// 失敗
//				});
				var mydata = [
				              { id: "1", invdate: "2007-10-01", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00" },
		                      { id: "2", invdate: "2007-10-02", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00" },
		                      { id: "3", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00" },
		                      { id: "4", invdate: "2007-10-04", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00" },
		                      { id: "5", invdate: "2007-10-05", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00" },
		                      { id: "6", invdate: "2007-09-06", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00" },
		                      { id: "7", invdate: "2007-10-04", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00" },
		                      { id: "8", invdate: "2007-10-03", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00" },
		                      { id: "9", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00" }
		               ];
				$('#tblGrid').jqGrid({
					styleUI: 'Bootstrap',	// bootstrapスタイルのグリッド
					hidegrid: false,	// キャプション横の、隠すボタンの表示制御
					datatype: 'json',
//					datatype: function (postdata) {
//						console.log(postdata);
//					},
					jsonReader: {
						root: "rows",
						total: "total",
						page: "page",
						records: "records",
						id: "id",
						cell: "cell"
					},
//					data: mydata,
					url: "/kadai/MiuTestServlet",
					mtype: "POST",
					caption: '課題リスト',		// TODO サーブレットから取得したリスト名称を設定する
		            colModel: [
		                       { label: 'Inv No', name: 'id', width: 75, key:true },
		                       { label: 'Date', name: 'invdate', width: 90 },
		                       { label: 'Client', name: 'name', width: 100 },
		                       { label: 'Amount', name: 'amount', width: 80 },
		                       { label: 'Tax', name: 'tax', width: 80 },
		                       { label: 'Total', name: 'total', width: 80 },
		                       { label: 'Notes', name: 'note', width: 150 }
		                   ],
		                   viewrecords: true, // show the current page, data rang and total records on the toolbar
		   				loadonce: false,
		   				viewrecords: true,
		   				rowNum: 20,
		                   pager: $("#divGridPager")
		               });
		   			// activate the build in search with multiple option
//		               $('#tblGrid').navGrid("#divGridPager", {                
//		                   search: true, // show search button on the toolbar
//		                   add: false,
//		                   edit: false,
//		                   del: false,
//		                   refresh: true
//		               },
//		               {}, // edit options
//		               {}, // add options
//		               {}, // delete options
//		               { multipleSearch: true } // search options - define multiple search
//		               );
			});
		}
	});

	/*
	// test table w2ui
	require([
	         'w2ui'
	], function (w2ui) {
		var fname = ['Vitali', 'Katsia', 'John', 'Peter', 'Sue', 'Olivia', 'Thomas', 'Sergei', 'Snehal', 'Avinash', 'Divia'];
		var lname = ['Peterson', 'Rene', 'Johnson', 'Cuban', 'Twist', 'Sidorov', 'Vasiliev', 'Yadav', 'Vaishnav'];
		$('#divGrid').w2grid({ 
			name: 'testGrid', 
			show: {
				lineNumbers: true,
				footer: true,
				toolbar: true
			},
	        columns: [
	                  { field: 'fname', caption: 'First Name', size: '180px' },
	                  { field: 'lname', caption: 'Last Name', size: '180px' },
	                  { field: 'email', caption: 'Email', size: '40%' },
	                  { field: 'sdate', caption: 'Start Date', size: '120px' },
	              ],
	              records: [
	                  { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	                  { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	                  { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	                  { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	                  { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	                  { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	                  { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	                  { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },	                  { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
	                  { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
	              ]

//			columns: [
//			  { field: 'personid', caption: 'ID', size: '50px', sortable: true, searchable: 'int', resizable: true },
//			  { field: 'fname', caption: 'First Name', size: '140px', sortable: true, searchable: 'text', resizable: true },
//			  { field: 'lname', caption: 'Last Name', size: '140px', sortable: true, searchable: 'text', resizable: true },
//			  { field: 'email', caption: 'Email', size: '100%', resizable: true, sortable: true },
//			  { field: 'snumber', caption: 'Number', size: '120px', resizable: true, sortable: true, render: 'money' },
//			  { field: 'sdate', caption: 'Date', size: '120px', resizable: true, sortable: true, render: 'date' }
//			]
		});

//		for (var i = 0; i < 25000; ++i) {
//			w2ui['testGrid'].add({
//	            recid : i+1,
//	            personid: i+1,
//	            fname: fname[Math.floor(Math.random() * fname.length)], 
//	            lname: lname[Math.floor(Math.random() * lname.length)],
//	            email: 'vm@gmail.com', manager: '--',
//	            snumber: Math.floor(Math.random() * 8000),
//	            sdate: (new Date(Math.floor(Math.random() * 20000) * 100000000)).getTime()
//			});
//		}
//		w2ui['testGrid'].refresh();
//		$('#divGrid').w2render('testGrid');
	});
	*/
	
	// テストテーブル表示処理
	// DataTables版
	/*
	require([
			 'text!html/TableData.html',
			 'datatables'
	], function (data) {
		var $table = $('#tblList');
		$table.html(data);
		var table = $table.DataTable({
			lengthChange: false,
//			scrollY: ,
//			scrollCollapse: true,
			ordering: false,
			fixedColumns: true
		});
		$(window).on({
			load: function () {
				var $wrapper = $('#tblList_wrapper'),
					$tableScrollBody = $('div.dataTables_scrollBody'),
					_calcHeightForTable = function (top, bottom) {
						var _diff = $(window).height() - ($wrapper.offset().top + $wrapper.outerHeight()),
							_nowHeight = $tableScrollBody.height();
						return _nowHeight - _diff;
					};
				$tableScrollBody.css('height', (_calcHeightForTable + 'px'));
				table.draw();
			}
		});
		table.on('draw.dt', function (e, settings, data) {
			console.log('DataTables init');
			var $wrapper = $('#tblList_wrapper'),
				$tableScrollBody = $('div.dataTables_scrollBody'),
				_calcHeightForTable = function (top, bottom) {
					var _diff = $(window).height() - ($wrapper.offset().top + $wrapper.outerHeight()),
						_nowHeight = $tableScrollBody.height();
					return _nowHeight - _diff;
				};
			$(window).on({
				load: function () {
					var $wrapper = $('#tblList_wrapper'),
					$tableScrollBody = $('div.dataTables_scrollBody'),
					_calcHeightForTable = function (top, bottom) {
						var _diff = $(window).height() - ($wrapper.offset().top + $wrapper.outerHeight()),
							_nowHeight = $tableScrollBody.height();
						return _nowHeight - _diff;
					};
					$tableScrollBody.css('height', (_calcHeightForTable + 'px'));
					table.draw();
				},
				resize: function () {
					$tableScrollBody.css('height', (_calcHeightForTable + 'px'));
					table.draw();
				}
			});
		});
	});
	*/
	
	// テストテーブル表示処理
	/*
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
	*/
	
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