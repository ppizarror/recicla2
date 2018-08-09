package com.recicla2.fotos;

import com.recicla2.CodigoError;
import util.core.AdministracionError;
import util.core.FuncionesNumericas;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

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
            out.write(AdministracionError.generaErrorGenerico(CodigoError.ERROR_DESCARGAR_COMENTARIO_FOTO));
            return;
        }

    }

    /**
     * No se aceptan request por GET.
     *
     * @param request  - Mensaje pedido servlet
     * @param response - Mensaje respuesta servlet
     * @throws ServletException Excepción del Servlet
     * @throws IOException      Error acceso IO
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.write(AdministracionError.generaErrorGenerico(CodigoError.CORE_POSTGET_ERROR));
    }

}
