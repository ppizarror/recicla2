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
include_once("../../../server/utils.php");

/**
 * Constantes
 */
const FILE_UPLOAD_PATH = "../../../../resources/photos/"; // Ubicación carpeta uploads
const FORM_SIZE = 11; // Tamaño del formulario
const TEST_TYPE_ERROR_KILL = 0; // Indica el tipo de error, si es verdadero redirige la aplicación y termina consulta
define('HOUR_FORMAT', 'Y-m-d H:i:s');

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
    $needed_keys = array('form-validated', 'nombre-articulo', 'descripcion-articulo', 'foto-counter', 'region-articulo', 'comuna-articulo', 'calle-articulo', 'nombre-contacto', 'email-contacto', 'fono-contacto', 'MAX_FILE_SIZE');
    foreach ($needed_keys as $k) {
        if (!isset($_POST[$k])) {
            throw_error('KEY NOT FOUND: ' . $k);
        }
    }
    $post_length = count(array_keys($_POST));
    if ($post_length != FORM_SIZE) {
        throw_error('POST LENGTH NOT MATCH');
    }

    /**
     * Verifica que se tenga el largo adecuado del post
     */
    $total_pics = htmlspecialchars($_POST['foto-counter']);
    if (is_numeric($total_pics)) {
        $total_pics = intval($total_pics);
        if ($total_pics > 5 or $total_pics < 1) {
            throw_error('INVALID TOTAL PICS LENGTH');
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
     * Tamaño máximo archivos
     */
    $_max_file_size = htmlspecialchars($_POST['MAX_FILE_SIZE']);
    if (is_numeric($_max_file_size)) {
        $_max_file_size = intval($_max_file_size);
    } else {
        throw_error('MAX_FILE_SIZE NOT VALID');
    }
    if ($_max_file_size != 4194304) {
        throw_error('MAX_FILE_SIZE HAS BEEN CHANGED BY USER');
    }
    $_max_file_size = min($_max_file_size, getMaximumFileUploadSize());

    /**
     * Valida los archivos (tamaño)
     */
    for ($i = 1; $i <= $total_pics; $i++) {
        $photo = 'foto-articulo' . $i;

        // Chequea que esté definida y sin error
        if (!isset($_FILES[$photo]) or $_FILES[$photo]['error'] != UPLOAD_ERR_OK) {
            throw_error('PHOTO ' . $photo . ' NOT VALID');
        }

        // Chequea que sea una imagen
        if (!getimagesize($_FILES[$photo]['tmp_name'])) {
            throw_error('FILE ' . $_FILES[$photo]['name'] . ' IS NOT AN IMAGE');
        }

        // Chequea que cumpla el tamaño máximo
        if ($_FILES[$photo]['size'] > $_max_file_size) {
            throw_error('FILE ' . $_FILES[$photo]['name'] . ' OUT OF SIZE');
        }
    }

    // En este punto todos los elementos han sido validados, así que obtiene la hora y sube los elementos
    date_default_timezone_set('America/Santiago');
    $_a_date = date('Y-m-d H:i:s');

    /**
     * Se escapan textos
     */
    $_a_cemail = $db->real_escape_string($_a_cemail);
    $_a_desc = $db->real_escape_string($_a_desc);
    $_a_name = $db->real_escape_string($_a_name);
    $_a_nc = $db->real_escape_string($_a_nc);

    /**
     * Se sube el artículo
     */
    $sql = "INSERT INTO articulo (nombre, descripcion, fecha_ingreso, comuna_id, calle_numero, nombre_contacto, email_contacto, fono_contacto) VALUES ('{$_a_name}','{$_a_desc}','{$_a_date}',{$_a_cm},'{$_a_st}','{$_a_nc}','{$_a_cemail}','{$_a_tel}');";
    $result = $db->query($sql);
    if (!$result) {
        throw_error('CANNOT QUERY INSERT INTO DATABASE');
    }

    // Se obtiene el último id
    $_a_id = mysqli_insert_id($db);

    /**
     * Se suben las fotos
     */
    for ($i = 1; $i <= $total_pics; $i++) {
        $photo = 'foto-articulo' . $i;
        $tmp_name = $_FILES[$photo]['tmp_name'];
        $file_extension = pathinfo($_FILES[$photo]['name'], PATHINFO_EXTENSION);
        $filename = uniqid(rand(), false) . '.' . $file_extension;
        if (!move_uploaded_file($_FILES[$photo]['tmp_name'], FILE_UPLOAD_PATH . $filename)) {
            throw_error('FILE ' . $_FILES[$photo]['name'] . ' COULD NOT BE SAVED ON THE SERVER');
        }

        // Añade imagen a base de datos
        $sql = "INSERT INTO fotografia (ruta_archivo, nombre_archivo, articulo_id) VALUES ('{$filename}','{$_FILES[$photo]['name']}',{$_a_id})";
        $result = $db->query($sql);
        if (!$result) {
            throw_error('CANNOT QUERY INSERT IMAGE ON DATABASE');
        }
    }

    /**
     * Termina conexión, se envía a menú principal
     */
    setcookie('additem', 1, 0, "/");
    header("Location: ../../../../index.php?status=added");
    die();
} else {
    throw_error('NOT POST');
}