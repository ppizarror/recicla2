package util.core;

/**
 * Funciones numéricas utilitarias.
 */
public class FuncionesNumericas {

    /**
     * Verifica si un string es numérico
     *
     * @param str Número
     * @return String contiene número
     */
    public static boolean isNumeric(String str) {
        try {
            //noinspection unused
            double d = Double.parseDouble(str);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }

}