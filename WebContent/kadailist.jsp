<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="kadai.beans.Kadai" %>
<%@ page import="kadai.beans.TaskList" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>kadai list</title>
</head>

<body bgcolor="pink">

<hr>
<h3>TEST KADAI SYSTEM</h3>
<hr>

<%= request.getContextPath() %>
<BR>
<%= ((Kadai)request.getAttribute("one")).getTitle() %>
<%= ((TaskList)request.getAttribute("list")).getList(request.getParameter("userid")) %>

<table border="1">
<% TaskList ichiran = (TaskList)request.getAttribute("list"); %>
<% for ( int i=0; i < ichiran.size() ;i++ ){ %>
<tr><Td><%= ichiran.get(i).getUserid() %> : <%= ichiran.get(i).getTitle() %></Td></tr>
<% } %>
</table>
<form action="Insert" method="post">
<br />
<table width="200">
<tr>
<td width="100">userid</td>
<td><input type="text" width="80" name="userid" value=" <%= request.getParameter("userid") %>" />
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