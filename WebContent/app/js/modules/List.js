require([
	'jquery',
	'js/modules/xhr'
], function ($, xhr) {
	var List = function () {	// constructor
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
		 * オープン中のリストID
		 */
		this.listId = null;
	};
	/**
	 * リストをオープンして、カラム情報を取得する
	 * サーブレットは、指定ユーザーが最後に開いたリストとして保存する
	 * @param {number} listId - 対象のリストID
	 */
	List.prototype.open = function (listId, success, error) {
		var _this = this;
		try {
			_this.xhr.ajax(
				'open',
				{ listId: listId },
				null,
				function (res) {
					// オープン成功
					try {
						_this.listId = listId;	// オープン中のリストのIDを更新
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
	/**
	 * リストデータ取得
	 * @param {number} [listId=this.listID] - 対象リストID
	 * @param {number} start - 取得行の開始番号
	 * @param {number} rows - 取得行数
	 */
	List.prototype.getListData = function (listId, start, rows, success, error) {
		var _this = this;
		try {
			_this.xhr.ajax(
				'getListData',
				{listId: _this.listId, start: start, rows: rows},
				null,
				function (res) {
					// 取得成功
					
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
	/**
	 * リストのカラム情報を取得する
	 */
	List.prototype.getColumnInfo = function (listId, success, error) {
		var _this = this;
		try {
			if (!listId) {	// TODO listidが数値なら、0のケアを考慮する必要あり
				// リストidが設定されていない
				throw new Error('リストIDが不明です');
			}
			_this.xhr.ajax(
				'getColumnInfo',
				{ listId: listId },
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