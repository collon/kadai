define([
        'jquery'
], function ($) {
	$.ajaxSetup({
		// ajax通信の基本設定
		url: '/MiuTestServlet',
		method: 'POST',
		contentType: 'application/json;charset=UTF-8',
		dataType: 'json'
	});
	var _ajax = function (arg) {
		// 参考：http://qiita.com/kawanamiyuu/items/9312e5d99b2b26bd6074
		
		var _defer = $.Deferred(),
			_opt, _jqXHR;
		
		_opt = $.extend(true, {}, $.ajaxSettings, arg);
		console.log($.ajaxSettings);
		
		_jqXHR = $.ajax(_opt);

		_jqXHR.done(function(data, statusText, jqXHR) {
			console.log('[ajax] done');

			// _defer.resovle ではなくて _defer.resolveWith で
			// myAjax(...).done() 内でのthisのコンテキストを
			// 明示的に指定する
			_defer.resolveWith(this, arguments);
		});

		_jqXHR.fail(function(jqXHR, statusText, errorThrown) {
			console.log('[ajax] fail');

			// _defer.reject ではなくて _defer.rejectWith で
			// myAjax(...).fail() 内でのthisのコンテキストを
			// 明示的に指定する
			_defer.rejectWith(this, arguments);
		});

		_jqXHR.always(function() {
			console.log('[ajax] always');
		});

		return $.extend({}, _jqXHR, _defer.promise());
	};
	return function (actionId, param, ajaxSettings, success, error) {
		// 引数チェック
		// ---> 異常の時に、どうステータスの設定をするか？
		_ajax($.extend(
			true,	// deep copy
			{
				headers: { 'x-custom-action-id': actionId },
				data: JSON.stringify(param)
			},
			ajaxSettings
		)).done(function (json, statusText, jqXHR) {
			var _actionStatus;

			// HTTPステータスコードチェック
			switch (jqXHR.status) {
			case 200:	// OK
				break;
			default:
				// 200以外は通信エラーとする
				if ($.isFunction(error)) {
					error.call(this, -101, '');
				}
				return;
			}

			// アクションステータスチェック
			_actionStatus = jqXHR.getResponseHeader('x-custom-action-status');

			if ($.isFunction(success)) {
				success.call(this, arguments);
			}
		}).fail(function (jqXHR, statusText, errorThrown) {
			if ($.isFunction(error)) {
				error.call(this, arguments);
			}
		});
	};
});