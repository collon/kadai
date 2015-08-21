function changeText(){
$("#about").html("<b>軽量/高速</b>なライブラリです");
};


function getJSON(){
	
		var myuserid=$(':text[name="userid"]').val();
		var mytitle=$(':text[name="title"]').val();
		
		$.ajax({
			url:"Insert",
			type:"GET",
			dataType:"json",
			data:{
				userid:myuserid,
				title:mytitle
			},
			cache:true,
			success:function(json){				
				
				$("#response").append(""+json.userid+"&nbsp;");
				$("#response").append(""+json.title+"<br>");
				
			},
			error:function(){
				alert("not json.");
			}
		});

		$("#a").html("<B>test</B>");

};


