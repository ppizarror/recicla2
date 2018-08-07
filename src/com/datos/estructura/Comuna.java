package com.datos.estructura;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Comunas de la aplicación.
 */

@SuppressWarnings("WeakerAccess")
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
     * @return ID de la comuna
     */
    public int obtenerID() {
        return this.id;
    }

    /**
     * Retorna la ID en un String de la comuna.
     *
     * @return ID de la comuna como un String
     */
    public String ObtenerIDStr() {
        return Integer.toString(this.id);
    }

    /**
     * Obtiene el nombre de la comuna.
     *
     * @return Nombre de la región
     */
    public String obtenerNombre() {
        return this.nombre;
    }

    /**
     * Retorna el JSON del objeto.
     *
     * @return JSON
     */
    @SuppressWarnings("unused")
    public JSONObject toJSON() {
        JSONObject a = new JSONObject();
        try {
            a.put(Integer.toString(this.obtenerID()), this.obtenerNombre());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return a;
    }

}