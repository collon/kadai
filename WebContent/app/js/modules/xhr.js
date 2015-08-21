define([
        'jquery'
], function ($) {
	// ajax通信の共通設定（クラス共通設定）
	$.ajaxSetup({
		url: '/kadai/MiuTestServlet',						// サーブレットのアクション受け付けurl
		method: 'POST',										// post
		contentType: 'application/json;charset=UTF-8',		// json形式で送る
		dataType: 'json',									// サーブレットからのレスポンスはjson
		timeout: 60 * 1000									// タイムアウトの設定
	});
	/**
	 * 通信用クラス
	 */
	var xhr = function () {	// constructor
		/**
		 * アクションステータス
		 */
		this.status = null;
		/**
		 * エラーメッセージ
		 */
		this.message = null;
	};
	/**
	 * ajax通信を行う
	 * @param actionId
	 * @param param
	 * @param ajaxSettings
	 * @param success
	 * @param error
	 */
	xhr.prototype.ajax = function (actionId, param, addSettings, success, error) {
		var _this = this,
			_defer = $.Deferred();
		// success/error関数の呼び出しを集約
		_defer.promise().then(
			function (response) {	// アクション成功
				if ($.isFunction(success)) {
					success.call(_this, response);
				}
			},
			function () {			// アクション失敗
				if ($.isFunction(error)) {
					error.call(_this);
				}
			}
		);
		// 通信ステータス初期化
		this.status = 0;
		this.message = null;
		// ajax実行
		$.ajax(
			$.extend(
				true,	// deep copy
				$.ajaxSettings,
				{	// アクションに必要な設定
					headers: { 'x-custom-action-id': actionId },	// アクションid
					data: JSON.stringify(param)						// アクション固有のパラメーター
				},
				addSettings	// 追加のajax settings (null/undefinedなら無視される)
			)
		).then(
			function (json, statusText, jqXHR) {	// $.ajaxで成功
				// HTTPステータスコードチェック
				switch (jqXHR.status) {
					case 200:	// OK
						break;
					default:
						// 200以外は通信エラーとする
						_this.status = -100;
						_this.message = '$.ajaxで成功したが、HTTPステータスコードが200以外のため失敗と判断 (ステータスコード: ' + jqXHR.status + ')';
						_defer.rejectWith(this);
						return;
				}
				// アクションステータスのチェック
				_this.status = jqXHR.getResponseHeader('x-custom-action-status');
				if (_this.status < 0) {
					// 負はアクション失敗ステータス
					
					// ここで、Webクライアントは共通エラーステータスチェックをしている
					// -101ならセッションエラー → 画面でメッセージも設定、など
					
					_this.message = json.message || '$.ajaxで成功したが、アクションステータスが負のため失敗（サーブレットから返されたエラーメッセージなし）';
					_defer.rejectWith(this);
					return;
				} else {
					_this.message = json.message;	// 正常の場合でもメッセージがある場合があるか？（とりあえず取得しておく）
				}
				// 成功
				_defer.resolveWith(this, [json]);
			},
			function (jqXHR, statusText, errorThrown) {		// $.ajaxで失敗
				_this.status = -999;
				_this.message = '$.ajaxで失敗 (statusText: ' + statusText + ')';
				_defer.rejectWith(this);
			}
		);
	};
	return xhr;
});