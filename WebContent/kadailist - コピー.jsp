<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="kadai.beans.Kadai" %>
<%@ page import="kadai.beans.TaskList" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<script>

window.onload = setComment();

function setComment(){
	document.form-insert.comment.value = "test";
}
</script>
<title>kadai list</title>
</head>

<body bgcolor="pink">

<hr>
<h3>TEST KADAI SYSTEM</h3>
<hr>
<%= request.getContextPath() %>
<BR>
<table border="1">
<% TaskList ichiran = (TaskList)request.getAttribute("list"); %>
<form action="" method="post"> 
<tr><th><input type="button" value="del" /></th><th>User</th><th>comment</th></tr>
<% for ( int i=0; i < ichiran.size() ;i++ ){ %>
<tr><td><input type="checkbox" name="id" value="<%= ichiran.get(i).getId() %>" ></td>
   <Td><%= ichiran.get(i).getUserid() %></td><td>&nbsp;<%= ichiran.get(i).getTitle() %></Td></tr>
<% } %>
</table>
</form>
<form action="Insert" method="post" name="form_insert">
<br />
<table width="200">
<tr>
<td width="100">userid</td>
<td><input type="text" width="80" name="userid" value="<%= session.getAttribute("user") %>" />
</tr>
<tr>
<td width="100">title</td>
<td><input type="text" width="80" name="title" />
</tr>
</table>

<input type="submit" name="button1" value="Insert">
</form>
</body>
</html>