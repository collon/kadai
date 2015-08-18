define([
        'jquery',
        'js/modules/xhr'
], function ($, xhr) {
	var UserInfo = function (userId) {	// constructor
		/**
		 * xhrオブジェクト
		 */
		this.xhr = new xhr();
		/**
		 * アクションステータス
		 */
		this.status = null;
		/**
		 * アクションのメッセージ
		 */
		this.message = null;
		/**
		 * ユーザーid
		 */
		this.userId = userId || null;
		/**
		 * 参照可能なリストの一覧
		 */
		this.arrayListInfo = null;
	};
	/**
	 * ユーザー情報を取得する
	 */
	UserInfo.prototype.getInfo = function (success, error) {
		var _this = this;
		try {
			if (! _this.userId) {
				// ユーザーidが設定されていない
				throw new Error('ユーザーが指定されていません');
			}
			_this.xhr.ajax(
				'getUserInfo',
				{ userId: this.userId },
				null,
				function (res) {
					try {
						if (! $.isPlainObject(res)) {
							// オブジェクトじゃない
							throw new Error('取得したデータが異常（オブジェクトじゃない）');
						}
						/*
						if (! ('arrayListInfo' in res && $.isArray(res.arrayListInfo))) {
							// arrayListInfoがない || 配列じゃない
							throw new Error('取得したデータが異常（arrayListInfo情報異常）');
						}
						_this.arrayListInfo = res.arrayListInfo;
						*/
						_this.status = 0;
						if ($.isFunction(success)) {
							success.call(_this, res);
						}
					} catch (e) {
						_this.status = -1;
						_this.message = e.message || 'その他のエラー';
						if ($.isFunction(error)) {
							error.call(_this);
						}
					}
				},
				function () {
					_this.status = this.status;
					_this.message = this.message;
					if ($.isFunction(error)) {
						error.call(_this);
					}
				}
			);
		} catch (e) {
			_this.status = -1;
			_this.message = e.message || 'その他のエラー';
			if ($.isFunction(error)) {
				error.call(_this);
			}
		}
	};
	return UserInfo;
});