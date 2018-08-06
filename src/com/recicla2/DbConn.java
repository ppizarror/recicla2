package com.recicla2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase que maneja la conexión con la base de datos
 */
@SuppressWarnings("FieldCanBeLocal")
class DbConn {

    private static String DB_CONN_URL = "jdbc:mysql://localhost:3306/tarea4?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    private static String DB_CONN_USER = "root";
    private static String DB_CONN_PASSWD = "";

    /**
     * Crea una conexión con la base de datos.
     *
     * @return - Conexión con la base de datos
     */
    static Connection crearConexionDB() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        Connection con = null;
        try {
            con = DriverManager.getConnection(DB_CONN_URL, DB_CONN_USER, DB_CONN_PASSWD);
            con.setAutoCommit(false);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return con;
    }

}