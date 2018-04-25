<?php
/**
 * Funciones utilitarias add_item.
 * @author Pablo Pizarro R. @ppizarror.com
 * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Genera un JSON de las regiones y comunas de Chile.
 * @param $db {Base de datos}
 */
function load_rc_chile($db)
{
    /** @var mysqli $db */

    // Almacena región y comunas
    $region = array();
    $comunas = array();

    /**
     * Carga región
     */
    $sql = "SELECT id,nombre FROM region";
    $result = $db->query($sql);
    while ($row = $result->fetch_assoc()) {
        $region[$row['id']] = $row['nombre'];
    }
    mysqli_free_result($result);

    /**
     * Carga comunas
     */
    foreach ($region as $rid => $value) {

        // Lista id-comuna
        $cir = array();

        // Consulta sql de comuna por región
        $sql = "SELECT id,nombre FROM comuna WHERE region_id={$rid} ORDER BY nombre,id ASC";
        $ncomunas = $db->query($sql);
        while ($row = $ncomunas->fetch_assoc()) {
            $cir[$row['nombre']] = $row['id'];
        }
        mysqli_free_result($ncomunas);

        // Añade lista a comunas
        $comunas[$rid] = $cir;
    }

    // Abre un script
    echo "<script>\n\t\t";

    /** @noinspection PhpUndefinedVariableInspection */
    /** @noinspection ES6ConvertVarToLetConst */
    /** @noinspection JSUnusedLocalSymbols */
    echo 'var $add_item_c_chile=' . json_encode($comunas);
    echo "\n\t\t";

    /** @noinspection PhpUndefinedVariableInspection */
    /** @noinspection ES6ConvertVarToLetConst */
    /** @noinspection JSUnusedLocalSymbols */
    echo 'var $add_item_r_chile=' . json_encode($region);

    // Cierra el script
    echo "\n\t</script>\n";
}