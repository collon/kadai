// なんかいろいろテスト用
// いずれ消す
define(['jquery'], function ($) {
	// global code (call only once)
	console.log('required TestModule at first.');
	return function () {
		$.ajax({
			url: '/kadai/MiuTestServlet',
			method: 'post',
			contentType: 'application/json;charset=UTF-8',
			dataType: 'json',
			headers: { 'x-custom-action-id': 'getUserInfo' },
			data: JSON.stringify({ arrayUserId: ['hoge01', 'hoge02' ] })
		}).done(function (data, statusText, jqXHR) {
			console.log('[done]');
			console.log(data);
			console.log(statusText);
			console.log(jqXHR);
			debugger;
		}).fail(function (jqXHR, statusText, errorThrown) {
			console.log('[fail]');
			console.log(jqXHR);
			console.log(statusText);
			console.log(errorThrown);
			debugger;
		});
	};
});