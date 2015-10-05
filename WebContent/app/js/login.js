require([
         'jquery',
         'jquery.bootstrap',
         'text!html/login.html',
         'domReady!'
], function ($, bootstrap, html) {
	$(document.body).html(html);
	
	/* 通信テスト */
	var $btnAdd = $('#btnLogin');
	$btnAdd.on({
		click: function () {
						
    		$.ajax({
    			url:"list",
    			type:"GET",
    			headers: { 'x-custom-action-id': 'login' },
    			dataType:"json",
    			data:{
    				userId: $('#tbxUserId').val(),
    				password: $('#tbxPassword').val()
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