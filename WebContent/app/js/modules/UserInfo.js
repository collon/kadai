define([
        'jquery',
        'js/modules/ajax'
], function ($, ajax) {
	var UserInfo = function (userId) {	// constructor
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
				// ユーザーidがない
				throw new Error('ユーザーが指定されていません');
			}
			ajax(
				'getUserInfo',
				{ userId: this.userId },
				function (res) {
					try {
						if (! $.isPlainObject(res)) {
							// オブジェクトじゃない
							throw new Error('取得したデータ異常（オブジェクトじゃない）');
						}
						if (! ('arrayListInfo' in res && $.isArray(res.arrayListInfo))) {
							// arrayListInfoがない || 配列じゃない
							throw new Error('取得したデータ異常（arrayListInfo情報異常）');
						}
						this.arrayListInfo = res.arrayListInfo;
						if ($.isFunction(success)) {
							success.call(_this, data);
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
					_this.status = null;	// どう設定する
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