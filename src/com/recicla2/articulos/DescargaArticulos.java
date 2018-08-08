package com.recicla2.articulos;

import com.recicla2.CodigoError;
import util.core.AdministracionError;
import util.core.FuncionesNumericas;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

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
        Obtiene el contexto del contenedor
         */
        ServletContext sc = getServletContext();

        /*
        Obtiene número de artículos por página
         */
        int totalArticulos = Integer.parseInt(sc.getInitParameter("articulosPorPagina"));

        /*
        Obtiene el número de la página, si no se pasa entonces es 1
         */
        int pag = 1;
        String $p = request.getParameter("page");
        if ($p != null && FuncionesNumericas.isNumeric($p)) {
            pag = Integer.parseInt($p); // Convierte a número
        }

    }

}