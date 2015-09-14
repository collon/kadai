require.config({
	paths: {
		'text': 'lib/text',
		'domReady': 'lib/domReady',
		'i18n': 'lib/i18n',
		'jquery': 'lib/jquery-2.1.4.min',
		'jquery.ui': 'lib/jquery-ui-1.11.4.custom/jquery-ui.min',
		'jquery.bootstrap': 'lib/bootstrap-3.3.5/js/bootstrap.min',
		'datatables': 'lib/DataTables/datatables.min',
		'js': 'js',
		'html': 'html'
	},
	shim: {
		'jquery.bootstrap': {
			deps: ['jquery']
		},
		'jquery.ui': {
			deps: ['jquery']
		},
		'datatables': {
			deps: ['jquery']
		}
	}
});

require([
], function () {
	require(['js/login']);
});