<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.recicla2.Recicla2Const" %>
<%@ page import="java.util.ArrayList" %>
<html>

<head>
    <title>$Title$</title>
</head>
<body>
<%
    ServletContext sc = request.getServletContext();
    out.print(sc.getAttribute(Recicla2Const.APP_ATTR_ERROR));
    //noinspection unchecked
    ArrayList<String> p = (ArrayList<String>) sc.getAttribute(Recicla2Const.APP_DATA_REGION);
    out.print(p);
%>
</body>
</html>