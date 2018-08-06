package com.datos.estructura;

import java.util.ArrayList;

/**
 * Estructura de dato región.
 */
public class Region {

    private ArrayList<Comuna> comunas; // Lista de comunas de la región
    private int id; // ID de la región
    private String nombre; // Nombre de la región

    /**
     * Constructor de la clase.
     */
    public Region(int id, String nombre) {
        this.comunas = new ArrayList<>();
        this.id = id;
        this.nombre = nombre;
    }

    /**
     * Obtiene la ID de la región.
     *
     * @return ID de la región
     */
    public int obtenerID() {
        return this.id;
    }

    /**
     * Obtiene el nombre de la región.
     *
     * @return Nombre de la región
     */
    public String obtenerNombre() {
        return this.nombre;
    }

    /**
     * Añade una comuna a la lista.
     *
     * @param c Comuna
     */
    public void AgregaComuna(Comuna c) {
        this.comunas.add(c);
    }

    /**
     * Retorna la lista de comunas de la región.
     *
     * @return Lista comunas
     */
    public ArrayList<Comuna> obtenComuna() {
        return this.comunas;
    }

}