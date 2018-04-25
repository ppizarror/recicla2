<?php
/**
 * Carga el ítem al servidor.
 * @author Pablo Pizarro R. @ppizarror.com
 * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Importación de librerías
 */
include_once("../../../server/dbconfig.php");

/**
 * Constantes
 */
const TEST_TYPE_ERROR_KILL = 0; // Indica el tipo de error, si es verdadero redirige la aplicación y termina consulta
const FORM_SIZE = 11; // Tamaño del formulario

/** @var mysqli $db */
$db = DbConfig::getConnection();

/**
 * Redirige a error consulta.
 * @param $id
 */
function throw_error($id)
{
    // Cierra la conexión
    global $db;
    $db->close();

    if (TEST_TYPE_ERROR_KILL) {
        header("Location: ../../../../error.php?id=uploadItemNotValid&code={$id}");
        die();
    } else {
        $_err_code = str_replace(" ", "_", $id);
        echo "<pre>Error en consulta.\nERROR CODE: {$_err_code}</pre>";
        die();
    }
}

/**
 * Comprueba que un string esté entre mínimo y maximo.
 * @param $s
 * @param $minl
 * @param $maxl
 * @return boolean
 */
function validate_string_size($s, $minl, $maxl)
{
    $l = strlen(trim($s)); // Largo del string

    if ($minl != -1 and $maxl != -1) {
        if ($minl <= $l and $l <= $maxl) {
            return true;
        }
    } else {
        if ($minl == -1) {
            if ($l <= $maxl) {
                return true;
            }
        } else {
            if ($l >= $minl) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Valida un número de teléfono
 * @param $t
 * @return boolean
 */
function validate_telephone($t)
{
    if (strlen($t) == 0) {
        return true;
    } else if (strlen($t) == 9 and is_numeric($t)) {
        if (substr($t, 0, 1) == "9") {
            return true;
        }
    }
    return false;
}

// Si se envía por post se realiza cadena de verificaciones
if ($_POST) {

    /**
     * Verifica que existan elementos del formulario
     */
    $needed_keys = array('form-validated', 'nombre-articulo', 'descripcion-articulo', 'foto-articulo1', 'foto-counter', 'region-articulo', 'comuna-articulo', 'calle-articulo', 'nombre-contacto', 'email-contacto', 'fono-contacto', 'MAX_FILE_SIZE');
    foreach ($needed_keys as $k) {
        if (!isset($_POST[$k])) {
            throw_error('KEY NOT FOUND');
        }
    }

    /**
     * Verifica que se tenga el largo adecuado del post
     */
    $post_length = count(array_keys($_POST));
    $total_pics = htmlspecialchars($_POST['foto-counter']);
    if (is_numeric($total_pics)) {
        $total_pics = intval($total_pics);
        if ($total_pics > 5 or $total_pics < 1) {
            throw_error('INVALID TOTAL PICS LENGTH');
        }
        if ($post_length != (FORM_SIZE + $total_pics)) {
            throw_error('POST LENGTH NOT MATCH');
        }
    }

    /**
     * Formulario válido
     */
    $form_valid = $_POST['form-validated'];
    if ($form_valid != 'true') {
        throw_error('FORM NOT VALID');
    }

    /**
     * Valida el nombre del artículo
     */
    $_a_name = htmlspecialchars($_POST['nombre-articulo']);
    if (!validate_string_size($_a_name, 15, 80)) {
        throw_error('NOMBRE-ARTICULO NOT VALID');
    }

    /**
     * Valida descripción del artículo
     */
    $_a_desc = htmlspecialchars($_POST['descripcion-articulo']);
    if (!validate_string_size($_a_desc, 0, 1000)) {
        throw_error('DESCRIPCION-ARTICULO NOT VALID');
    }

    /**
     * Valida la región
     */
    $_a_reg = htmlspecialchars($_POST['region-articulo']);
    if (!is_numeric($_a_reg)) {
        throw_error('REGION NOT VALID');
    }
    // Se busca que la región exista en la db
    $sql = "SELECT * FROM region WHERE id={$_a_reg}";
    $result = $db->query($sql);
    if (mysqli_num_rows($result) != 1) {
        throw_error('REGION NOT EXISTS');
    }
    mysqli_free_result($result);
    $_a_reg = intval($_a_reg);

    /**
     * Valida la comuna
     */
    $_a_cm = htmlspecialchars($_POST['comuna-articulo']);
    if (!is_numeric($_a_cm)) {
        throw_error('COMUNA NOT VALID');
    }
    // Se busca que la región exista en la db
    $sql = "SELECT * FROM comuna WHERE region_id={$_a_reg} AND id={$_a_cm}";
    $result = $db->query($sql);
    if (mysqli_num_rows($result) != 1) {
        throw_error('COMUNA NOT EXISTS');
    }
    mysqli_free_result($result);
    $_a_cm = intval($_a_cm);

    /**
     * Valida la calle
     */
    $_a_st = htmlspecialchars($_POST['calle-articulo']);
    if (!validate_string_size($_a_st, 10, 150)) {
        throw_error('CALLE-ARTICULO NOT VALID');
    }

    /**
     * Valida el nombre del contacto
     */
    $_a_nc = htmlspecialchars($_POST['nombre-contacto']);
    if (!validate_string_size($_a_nc, 10, 200)) {
        throw_error('NOMBRE-CONTACTO ARTICULO NOT VALID');
    }

    /**
     * Valida el correo del contacto
     */
    $_a_cemail = htmlspecialchars($_POST['email-contacto']);
    if (!filter_var($_a_cemail, FILTER_VALIDATE_EMAIL) or !validate_string_size($_a_cemail, 0, -1)) {
        throw_error('INVALID EMAIL');
    }

    /**
     * Valida el teléfono del usuario
     */
    $_a_tel = htmlspecialchars($_POST['fono-contacto']);
    if (!validate_telephone($_a_tel)) {
        throw_error('FONO-CONTACTO NOT VALID');
    }

    /**
     * Valida los archivos (tamaño)
     */


} else {
    throw_error('NOT_POST');
}