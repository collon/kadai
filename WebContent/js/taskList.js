
$(jQuery(document).ready(

		function(){
			
			var myuserid="yamada";
            var selectStr="<select name=\"selectCategory\" id=\"selectCategory\" onselect='selectOne()'>";
            	selectStr+="<option value='none'>&nbsp;</option>";
            var selectStrNew="<option value='new'>New...</option>";
            
        	$("#topTitle").html("Welcome to New Page.");
            $("#tblTaskList").append("<tr><td id=\"tdTaskList\"><input type=\"checkbox\" name=\"\" value=1 /></td><td>memo memo</td></tr>");

        		$.ajax({
            			url:"Category",
            			type:"GET",
            			dataType:"json",
            			data:{
            				userid:myuserid,
            				orderToCategory:"list"
            			},
            			cache:false,
            			success:function(json){				
        
            				
            				
            				var detailStr = json.list;
            				
            				$(detailStr).each(function(i,item){
//TODO:            					
//            					alert(item.userid);
            					selectStr += "<option value=\"" + item.taskCategoryId + "\">"+item.categoryName + "</option>";
            				});
            				
                        	selectStr += selectStrNew + "</select>";
                         	selectStr+="<input type=\"button\" onClick='selectOne()' value=\"select\" />";
                            $("#catList").html(selectStr);
                                    				
            			},
            			error:function(){
            				alert("not json.");

                        	selectStr += selectStrNew + "</select>";
                         	selectStr+="<input type=\"button\" onClick=\"loadSelect()\" value=\"select\" />";

                            $("#catList").html(selectStr);
            			}
            		});                  

		})
);

function loadSelect(){

};
 
function selectOne(){

	var selectItem = $("#selectCategory").val();
    var myuserid="yamada";
    var orderToCategory = "select";
    var addCat="";

    if(selectItem=="new"){
        orderToCategory="add";
        addCat = window.prompt("新しいカテゴリ名を入力してください。");
        alert(addCat);
    }

    $.ajax({
        url:"Category",
        type:"GET",
        dataType:"json",
        data:{
            userid:myuserid,
            orderToCategory:orderToCategory,
            taskCatId:selectItem,
            catName:addCat
        },
        cache:false,
        success:function(json){

            if(orderToCategory=="select") {
                var detailStr = json.list;
                $("#tblTaskList tbody").remove();

                $(detailStr).each(function (i, item) {
                    $("#tblTaskList").append("<tr><td id=\"tdTaskList\">"+
                        "<input type=\"checkbox\" value="+ item.id + " />"+
                        "</td><td>"+ item.title +
                        "</td></tr>");
                });
            }else{
                alert("add");

            }

        },
        error:function(){

            //todo
            alert("not json. select");

        }
    });

};

$(function(){
$("#selectCategory").on({
    change: function () {
        selectOne();
    }
});
});