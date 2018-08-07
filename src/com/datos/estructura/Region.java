package com.datos.estructura;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Estructura de dato región.
 */
@SuppressWarnings("WeakerAccess")
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
     * Obtiene la ID de la región como un String.
     *
     * @return ID de la región en un String
     */
    public String obtenerIDString() {
        return Integer.toString(this.id);
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
    @SuppressWarnings("unused")
    public ArrayList<Comuna> obtenComuna() {
        return this.comunas;
    }

    /**
     * Retorna el JSON de la lista de comunas
     */
    public JSONObject JSONComunas() {
        JSONObject json = new JSONObject();
        for (Comuna ce : this.comunas) {
            try {
                json.put(ce.ObtenerIDStr(), ce.obtenerNombre());
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return json;
    }

    /**
     * Crea un JSON desde una lista de regiones.
     *
     * @param r - Lista de regiones
     * @return JSON del objeto
     */
    public static JSONObject JSONListaRegiones(ArrayList<Region> r) {
        JSONObject json = new JSONObject();
        for (Region re : r) {
            try {
                json.put(re.obtenerIDString(), re.obtenerNombre());
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return json;
    }

}