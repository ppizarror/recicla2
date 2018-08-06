<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.recicla2.Recicla2Const" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.datos.estructura.*" %>
<html>
<head>
    <title>Recicla2</title>
</head>
<body>
<%
    ServletContext sc = request.getServletContext();
    //noinspection unchecked
    ArrayList<Region> regiones = (ArrayList<Region>) sc.getAttribute(Recicla2Const.APP_DATA_REGION);
    for (Region r : regiones) {
        out.print(r.obtenerNombre());
        out.print(r.obtenerID());
    }
%>
</body>
</html>