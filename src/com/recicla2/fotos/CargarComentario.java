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
import java.util.Date;

public class CargarComentario extends HttpServlet {

    /**
     * Carga un comentario.
     *
     * @param request  - Mensaje pedido servlet
     * @param response - Mensaje respuesta servlet
     * @throws ServletException Excepción del Servlet
     * @throws IOException      Error acceso IO
     */
    @SuppressWarnings("RedundantThrows")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

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
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_CARGA_COMENTARIO_FOTO));
            return;
        }

        /*
        Obtiene el comentario de la foto
         */
        String comentario = request.getParameter("c");
        if (comentario == null || comentario.length() > 512 || comentario.length() == 0) {
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_CARGA_COMENTARIO_FOTO));
            return;
        }

        /*
        Genera fecha consulta
         */
        Date fecha = new Date();

        /*
        Genera conexión con base de datos
         */
        Connection con = DbConn.crearConexionDB();
        if (con == null) {
            out.write(AdministracionError.generaErrorGenerico(CodigoError.CORE_APP_DB_CONN));
            return;
        }

        /*
        Verifica que la foto exista
         */
        PreparedStatement pstSelect;
        try {
            pstSelect = con.prepareStatement("SELECT count(id) FROM fotografia WHERE id=?");
            pstSelect.setInt(1, fotoID);
        } catch (SQLException e) {
            e.printStackTrace();
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_CARGA_COMENTARIO_FOTO));
            return;
        }
        ResultSet resultados;
        try {
            resultados = pstSelect.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_CARGA_COMENTARIO_FOTO, "consultaIDFoto"));
            return;
        }

        int total;
        try {
            resultados.next();
            total = resultados.getInt(1);
            if (total != 1) {
                out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_CARGA_COMENTARIO_FOTO, "fotoInvalida"));
                return;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        /*
        Carga el comentario
         */
        try {
            pstSelect = con.prepareStatement("INSERT INTO comentario_fotografia (fecha,comentario,fotografia) VALUES (?,?,?)");
            java.sql.Date sqlDate = new java.sql.Date(fecha.getTime());
            pstSelect.setDate(1, sqlDate);
            pstSelect.setString(2, comentario);
            pstSelect.setInt(3, fotoID);
        } catch (SQLException e) {
            e.printStackTrace();
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_CARGA_COMENTARIO_FOTO, "crearConsulta"));
            return;
        }

        try {
            pstSelect.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_CARGA_COMENTARIO_FOTO, "cargaSQL"));
            return;
        }

        /*
        Cierra la conexión con la base de datos
         */
        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        JSONObject json = new JSONObject();
        try {
            json.put("status", "ok");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        out.write(json.toString());

    }

    /**
     * No se aceptan request por GET.
     *
     * @param request  - Mensaje pedido servlet
     * @param response - Mensaje respuesta servlet
     * @throws ServletException Excepción del Servlet
     * @throws IOException      Error acceso IO
     */
    @SuppressWarnings("RedundantThrows")
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.write(AdministracionError.generaErrorGenerico(CodigoError.CORE_POSTGET_ERROR));
    }

}
