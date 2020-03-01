<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

id: <%= getId() %>

<%!
	String id = "u001";
	public String getId() {
		return id;
	}
%>

</body>
</html>