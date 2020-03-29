<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ page import="java.util.*" %>
<c:import url="http://localhost:8080/firstweb/jstlValue.jsp" var="urlValue" scope="request"></c:import>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
읽어들인 값 : ${urlValue}
</body>
</html>