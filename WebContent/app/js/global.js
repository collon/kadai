// 各分割モジュールで横断的に使用するグローバルな情報の保持、アクセス
define(function () {
	var _global = {};
	return function () {
		return _global;
	};
});