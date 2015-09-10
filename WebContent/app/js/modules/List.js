require([
         'jquery',
         'js/modules/xhr'
 ], function ($, xhr) {
	var List = function (listId) {	// constructor
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
		 * リストid
		 */
		this.listId = listId || null;
		/**
		 * 
		 */
	};
	/**
	 * リストのカラム情報を取得する
	 */
	List.prototype.getColumnInfo = function (success, error) {
		var _this = this;
		try {
			if (! _this.listId) {
				// リストidが設定されていない
				throw new Error('リストIDが不明です');
			}
			_this.xhr.ajax(
				'getColumnInfo',
				{ listId: _this.listId },
				null,
				function (res) {
					try {
						// 取得データのチェック（念のため）
						if (! $.isPlainObject(res)) {
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
	return List;
});