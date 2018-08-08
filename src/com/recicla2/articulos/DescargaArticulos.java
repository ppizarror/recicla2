package com.recicla2.articulos;

import com.recicla2.CodigoError;
import com.recicla2.DbConn;
import org.json.JSONException;
import org.json.JSONObject;
import util.core.AdministracionError;
import util.core.FuncionesNumericas;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Descarga los artículos desde el servidor.
 */
@SuppressWarnings("RedundantThrows")
public class DescargaArticulos extends HttpServlet {

    /**
     * No se aceptan request por POST.
     *
     * @param request  - Mensaje pedido servlet
     * @param response - Mensaje respuesta servlet
     * @throws ServletException Excepción del Servlet
     * @throws IOException      Error acceso IO
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.write(AdministracionError.generaErrorGenerico(CodigoError.CORE_POSTGET_ERROR));
    }

    /**
     * Retorna los artículos, pide número de página.
     *
     * @param request  - Mensaje pedido servlet
     * @param response - Mensaje respuesta servlet
     * @throws ServletException Excepción del Servlet
     * @throws IOException      Error acceso IO
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        /*
        Genera el objeto para escribir
         */
        PrintWriter out = response.getWriter();

        /*
        Obtiene el contexto del contenedor
         */
        ServletContext sc = getServletContext();

        /*
        Obtiene número de artículos por página
         */
        int obt_articulo_limite = Integer.parseInt(sc.getInitParameter("articulosPorPagina"));

        /*
        Obtiene el número de la página, si no se pasa entonces es 1
         */
        int pag = 0;
        String $p = request.getParameter("page");
        if ($p != null && FuncionesNumericas.isNumeric($p)) {
            pag = Math.max(0, Integer.parseInt($p)); // Convierte a número
        }
        int obt_articulo_desde = pag * obt_articulo_limite;

        /*
        Obtiene la comuna si es que aplica
         */
        boolean filtrarPorComuna = false;
        String $fpc = request.getParameter("comuna");
        int comunaid = 0;
        if ($fpc != null && FuncionesNumericas.isNumeric($fpc)) {
            comunaid = Integer.parseInt($fpc); // Convierte a número
            filtrarPorComuna = true;
        }

        /*
        Indica si los resultados se obtienen en orden descendente
         */
        boolean orden_descendente = true;
        String $ord = request.getParameter("asc");
        if ($ord.equals("true")) {
            orden_descendente = false; // Orden ascendente
        }

        /*
        Genera conexión con base de datos
         */
        Connection con = DbConn.crearConexionDB();
        if (con == null) {
            out.write(AdministracionError.generaErrorGenerico(CodigoError.CORE_APP_DB_CONN));
            return;
        }

       /*
       Genera la consulta
        */
        PreparedStatement pstSelect = prepararConsulta(con, obt_articulo_limite, obt_articulo_desde, orden_descendente, filtrarPorComuna, comunaid);
        if (pstSelect == null) {
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_DESCARGAR_ARTICULOS));
        }

        /*
        Obtiene los resultados
         */
        ResultSet resultados;
        try {
            assert pstSelect != null;
            resultados = pstSelect.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_DESCARGAR_ARTICULOS));
            return;
        }
        JSONObject json = new JSONObject(); // JSON Artículos

        /*
        Recorre los resultados
         */
        try {
            while (resultados.next()) {
                JSONObject articulo = new JSONObject();
                String articuloID = Integer.toString(resultados.getInt(1));

                /*
                Arma el artículo
                 */
                json.put("id", resultados.getInt(1));

                json.put(articuloID, articulo); // Añade artículo a artículos
            }
        } catch (SQLException e) {
            e.printStackTrace();
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_DESCARGAR_ARTICULOS));
            return;
        } catch (JSONException e) {
            e.printStackTrace();
        }

        /*
        Cierra la conexión con la base de datos
         */
        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        /*
        Escribe los resultados
         */
        out.write(json.toString());

    }

    /**
     * Prepara la consulta dependiendo de los valores obtenidos desde GET.
     *
     * @param con           - Conexión con la base de datos
     * @param limite        - Límite de consultas SQl
     * @param desde         - Indica desde qué elemento se obtienen valores
     * @param descendente   - Indica si aplica orden ascendente o descendente en la obtención de artículos
     * @param filtrarcomuna - Filtra las comunas por ID
     * @param numerocomuna  - Número de la comuna a filtrar
     * @return Retorna el PreparedStatement para hacer las peticiones
     */
    private PreparedStatement prepararConsulta(Connection con, int limite, int desde, boolean descendente, boolean filtrarcomuna, int numerocomuna) {

        /*
        Prepara la sentencia
         */
        PreparedStatement pstSelect = null;

        try {
            if (!filtrarcomuna) { // No aplica filtro comuna
                if (descendente) {
                    pstSelect = con.prepareStatement("SELECT * FROM articulo ORDER BY fecha_ingreso DESC LIMIT ? OFFSET ?");
                } else {
                    pstSelect = con.prepareStatement("SELECT * FROM articulo ORDER BY fecha_ingreso ASC LIMIT ? OFFSET ?");
                }
                pstSelect.setInt(1, limite);
                pstSelect.setInt(2, desde);
            } else { // Aplica filtro comuna
                if (descendente) {
                    pstSelect = con.prepareStatement("SELECT * FROM articulo WHERE comuna_id=? ORDER BY fecha_ingreso DESC LIMIT ? OFFSET ?");
                } else {
                    pstSelect = con.prepareStatement("SELECT * FROM articulo WHERE comuna_id=? ORDER BY fecha_ingreso ASC LIMIT ? OFFSET ?");
                }
                pstSelect.setInt(1, numerocomuna);
                pstSelect.setInt(2, limite);
                pstSelect.setInt(3, desde);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        /*
        Retorna la sentencia
         */
        return pstSelect;

    }

}