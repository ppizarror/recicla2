package com.recicla2.articulos;

import com.recicla2.DbConn;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Obtiene artículos.
 */
public class ObtenerTotalArticulos {

    /**
     * Retorna el total de artículos existentes en la base de datos.
     *
     * @return Número de artículos
     */
    @SuppressWarnings("Duplicates")
    public static String obtener() {

        /*
        Genera conexión con base de datos
         */
        Connection con = DbConn.crearConexionDB();
        if (con == null) return "0";

        /*
        Genera consulta
         */
        PreparedStatement pstSelect;
        try {
            pstSelect = con.prepareStatement("SELECT COUNT(id) FROM articulo");
        } catch (SQLException e) {
            e.printStackTrace();
            return "0";
        }
        ResultSet resultados;
        try {
            resultados = pstSelect.executeQuery();
        } catch (SQLException e) {
            return "0";
        }

        /*
        Obtiene total
         */
        int total;
        try {
            resultados.next();
            total = resultados.getInt(1);
        } catch (SQLException e) {
            e.printStackTrace();
            return "0";
        }

        /*
        Cierra la conexión con la base de datos
         */
        try {
            con.close();
            pstSelect.close();
            resultados.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Integer.toString(total);
    }

}