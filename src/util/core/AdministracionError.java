package util.core;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Clase que administra los errores, permite generar nuevos.
 */
@SuppressWarnings("FieldCanBeLocal")
public class AdministracionError {

    private static String ERRORKEY = "error";

    /**
     * Genera un error como JSON para retornar, ideal para casos de POST/GET
     *
     * @param msg - Mensaje de error
     * @return String con JSON
     */
    public static String generaErrorGenerico(String msg) {
        JSONObject json = new JSONObject();
        try {
            json.put(ERRORKEY, msg);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return json.toString();
    }

}