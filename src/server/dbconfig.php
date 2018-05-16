<?php
/**
 * Class DbConfig
 * Clase que crea una conexión a la base de datos.
 * Utilizada desde archivos taller 2
 *
 * Modo de uso:
 *      $db = DbConfig::getConnection();
 *      $sql = "SELECT id, nombre FROM region"
 *      $result = $db->query($sql);
 *      $res = array();
 *      while ($row = $result->fetch_assoc()) {
 *          $res[] = $row;
 *      }
 *      $db->close();
 *      Resultados están en arreglo $res.
 */

class DbConfig
{
    private static $db_name = "tarea2"; // Base de datos de la app
    private static $db_user = "root"; // Usuario MySQL
    private static $db_pass = ""; // Password
    private static $db_host = "localhost";// Servidor
    private static $db_port = 3306; // Puerto del server

    /**
     * @return mysqli
     */
    public static function getConnection()
    {
        $mysqli = new mysqli(self::$db_host, self::$db_user, self::$db_pass, self::$db_name, self::$db_port);
        $mysqli->set_charset("utf8");
        return $mysqli;
    }
}