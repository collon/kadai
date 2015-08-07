$(function () {
	// main.htmlをロードして、bodyに貼り付ける
	$(document.body).load('/kadai/html/main.html', function () {
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
		tableContent += '</tr>';
		tableContent += '</thead>';
		tableContent += '<tbody>';
		for (var i = 1; i < 300; ++i) {
			tableContent += '<tr>';
			tableContent += '<td>' + i + '</td>';
			tableContent += '<td>' + _testFirstName + i + '</td>';
			tableContent += '<td>' + _testLastName + i + '</td>';
			tableContent += '<td>' + _testScore + '</td>';
			tableContent += '</tr>';
		}
		tableContent += '</tbody>';
		tableContent += '</table>';
		$divContent.html(tableContent);
	});
});