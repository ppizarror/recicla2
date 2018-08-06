package com.datos.estructura;

/**
 * Comunas de la aplicación.
 */
public class Comuna {

    private int id; // ID de la comuna
    private String nombre; // Nombre de la comuna

    /**
     * Constructor de la clase.
     */
    public Comuna(int id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    /**
     * Obtiene la ID de la comuna.
     *
     * @return ID de la región
     */
    public int obtenerID() {
        return this.id;
    }

    /**
     * Obtiene el nombre de la comuna.
     *
     * @return Nombre de la región
     */
    public String obtenerNombre() {
        return this.nombre;
    }
}