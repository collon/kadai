require([
         'jquery',
         'jquery.bootstrap',
         'sha256',
         'text!html/login.html',
         'domReady!'
], function ($, bootstrap, html) {
	$(document.body).html(html);
	
	/* 通信テスト */
	var $btnAdd = $('#btnLogin');
	$btnAdd.on({
		click: function () {
			
			var shaPwd = new jsSHA($('#tbxPassword').val(), "ASCII");
			var valSha256 = shaPwd.getHash("SHA-256", "HEX");
//			password: $('#tbxPassword').val()
						
    		$.ajax({
    			url:"list",
    			type:"GET",
    			headers: { 'x-custom-action-id': 'login' },
    			dataType:"json",
    			data:{
    				userId: $('#tbxUserId').val(),
    				password: valSha256
    			},
    			cache:false,
    			success:function(json){				
    				require(['js/main']);
    				    			},
    			error:function(){
    				alert("not json.");
    			}
    		});                  
		}
	});
});