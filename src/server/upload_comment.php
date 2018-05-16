<?php
/**
 * Carga comentarios al servidor por ajax.
 * @author Pablo Pizarro R. @ppizarror.com
 * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Importación de librerías
 */
include_once("dbconfig.php");
include_once("utils.php");

/** @var mysqli $db */
$db = DbConfig::getConnection();

/**
 * Lanza un error, retorna un arreglo con el errorkey
 * @param string $id
 */
function throw_error($id)
{
    global $db;
    $db->close();
    $id = str_replace(" ", "_", $id);
    $err = array("error" => $id);
    echo json_encode($err);
    die();
}

if ($_POST and !$_GET) {

    /**
     * Se verifican parámetros post
     */
    $postkeys = array_keys($_POST);
    if (count($postkeys) !== 4) {
        throw_error("BAD POST SIZE");
    }
    $needed_keys = array("comment-author", "comment-text", "validated", "itemid");
    foreach ($needed_keys as $k) {
        if (!isset($_POST[$k])) {
            throw_error('KEY NOT FOUND: ' . $k);
        }
    }

    /**
     * Obtiene parámetros
     */
    $comment = $db->real_escape_string(htmlspecialchars($_POST["comment-text"]));
    $author = $db->real_escape_string(htmlspecialchars($_POST["comment-author"]));
    $validated = $db->real_escape_string(htmlspecialchars($_POST["validated"]));
    $itemid = $db->real_escape_string(htmlspecialchars($_POST["itemid"]));

    /**
     * Validación comentario
     */
    if (!validate_string_size($comment, 10, 500)) {
        throw_error("COMMENT NOT VALID");
    }

    /**
     * Validación nombre comentarista
     */
    if (!validate_string_size($author, 5, 200)) {
        throw_error("AUTHOR NAME NOT VALID");
    }

    /**
     * Validación formulario
     */
    if (!$validated === 'true') {
        throw_error("FORM NOT VALID");
    }

    /**
     * Validación item id
     */
    if (!is_numeric($itemid)) {
        throw_error("ITEM ID NOT VALID");
    } else {
        $itemid = intval($itemid);
        if ($itemid < 0) {
            throw_error("ITEM ID MUST BE POSITIVE");
        }

        // Busca que el item exista
        $sql = "SELECT nombre FROM articulo where id={$itemid}";
        $result = $db->query($sql) or die("ERROR ON ACCESS DB");
        $result_length = mysqli_num_rows($result);
        mysqli_free_result($result);
        if ($result_length !== 1) {
            throw_error("ITEM ID NOT EXITS");
        }
    }

    /**
     * Se obtiene fecha comentario
     */
    date_default_timezone_set('America/Santiago');
    $comment_date = date(DATE_FORMAT);

    /**
     * Se carga el comentario
     */
    $sql = "INSERT INTO comentario (articulo_id,nombre_comentarista,comentario,fecha) VALUES ({$itemid},'{$author}','{$comment}','{$comment_date}')";
    $result = $db->query($sql) or die("ERROR EN DB");
    if (!$result) {
        throw_error('CANNOT INSERT COMMENT ON DB');
    }

    /**
     * Retorna OK y fecha del comentario
     */
    $err = array("error" => "", "date" => $comment_date);
    echo json_encode($err);
    $db->close();
} else {
    throw_error("NOT POST");
}