package com.recicla2;

import com.datos.estructura.Comuna;
import com.datos.estructura.Region;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Descarga las regiones y las comunas al iniciar el servlet
 */
public class DescargaRegionComuna implements ServletContextListener,
        HttpSessionListener, HttpSessionAttributeListener {

    /**
     * Constructor público.
     */
    public DescargaRegionComuna() {
    }

    /**
     * Este método se llama cuando el contenedor se inicia, descarga las comunas y regiones desde
     * la base de datos.
     *
     * @param sce - Evento ServletContext
     */
    public void contextInitialized(ServletContextEvent sce) {

        /*
        Obtiene el contexto del contenedor
         */
        ServletContext sc = sce.getServletContext();

        /*
        Genera conexión con base de datos
         */
        Connection con = DbConn.crearConexionDB();
        if (con == null) {
            sc.setAttribute(Recicla2Const.APP_ATTR_ERROR, "Error al conectar con la base de datos");
            return;
        }

        /*
        Genera consulta SQL descarga de regiones
         */
        PreparedStatement pstSelect;
        try {
            pstSelect = con.prepareStatement("SELECT * FROM region");
        } catch (SQLException e) {
            e.printStackTrace();
            sc.setAttribute(Recicla2Const.APP_ATTR_ERROR, "Error al preparar consulta SQL descarga región");
            return;
        }
        ResultSet rSelect;
        try {
            rSelect = pstSelect.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            sc.setAttribute(Recicla2Const.APP_ATTR_ERROR, "Error al consultar las regiones");
            return;
        }
        ArrayList<Region> rArray = new ArrayList<>();

        /*
         * Recorre las regiones y las guarda
         */
        try {
            while (rSelect.next()) {
                Region r = new Region(rSelect.getInt(1), rSelect.getString(2));

                /*
                Obtiene las comunas
                 */
                pstSelect = con.prepareStatement("SELECT * FROM comuna WHERE region_id=? LIMIT 1");
                pstSelect.setInt(1, rSelect.getInt(1));
                ResultSet cSelect = pstSelect.executeQuery();

                /*
                Añade comuna a la región
                 */
                while (cSelect.next()) {
                    Comuna c = new Comuna(cSelect.getInt(1), cSelect.getString(2));
                    r.AgregaComuna(c);
                }

                /*
                Añade región a la lista
                 */
                rArray.add(r);

            }
        } catch (SQLException e) {
            sc.setAttribute(Recicla2Const.APP_ATTR_ERROR, "Error en iterar sobre las regiones");
        }

        /*
        Establece las regiones como parámetro del paquete
         */
        sc.setAttribute(Recicla2Const.APP_DATA_REGION, rArray);

    }

    /**
     * El contenedor se destruye, elimina el atributo.
     *
     * @param sce - Evento ServletContext
     */
    public void contextDestroyed(ServletContextEvent sce) {
        ServletContext sc = sce.getServletContext();
        sc.removeAttribute(Recicla2Const.APP_DATA_REGION);
    }

}