package com.recicla2.fotos;

import com.recicla2.CodigoError;
import com.recicla2.DbConn;
import org.json.JSONException;
import org.json.JSONObject;
import util.core.AdministracionError;
import util.core.FuncionesNumericas;

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
 * Descarga de comentarios desde el servidor.
 */
@SuppressWarnings("RedundantThrows")
public class DescargaComentarios extends HttpServlet {

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
     * Descarga comentarios asociados a la ID de una foto.
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
        Obtiene ID de la foto
         */
        int fotoID;
        String $id = request.getParameter("id");
        if ($id != null && FuncionesNumericas.isNumeric($id)) {
            fotoID = Math.max(0, Integer.parseInt($id)); // Convierte a número
        } else {
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_DESCARGAR_COMENTARIO_FOTO));
            return;
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
        Prepara consulta base de datos
         */
        PreparedStatement pstSelect;
        try {
            pstSelect = con.prepareStatement("SELECT * FROM comentario_fotografia WHERE fotografia=? ORDER BY fecha DESC");
            pstSelect.setInt(1, fotoID);
        } catch (SQLException e) {
            e.printStackTrace();
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_DESCARGAR_COMENTARIO_FOTO));
            return;
        }

        /*
        Obtiene los resultados
         */
        ResultSet resultados;
        try {
            resultados = pstSelect.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_DESCARGAR_COMENTARIO_FOTO));
            return;
        }
        JSONObject json = new JSONObject(); // JSON Comentarios fotos

        try {
            while (resultados.next()) {

                /*
                Genera json comentario en particular
                 */
                JSONObject cfoto = new JSONObject();
                cfoto.put("id", resultados.getInt(1));
                cfoto.put("fecha", resultados.getString(2));
                cfoto.put("comentario", resultados.getString(3));

                /*
                Agrega a los resultados generales
                 */
                json.put(Integer.toString(resultados.getInt(1)), cfoto);

            }
        } catch (SQLException | JSONException e) {
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

}
