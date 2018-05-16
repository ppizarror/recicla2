<?php
/**
 * Obtiene nombres de ítem desde el servidor mediante Ajax
 *
 * @author Pablo Pizarro R. @ppizarror.com
 * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Importación de librerías
 */
include_once("dbconfig.php");
include_once("utils.php");
include_once("item.php");

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
    if (count($postkeys) !== 1) {
        throw_error("BAD POST SIZE");
    }
    $needed_keys = array("item-name-search");
    foreach ($needed_keys as $k) {
        if (!isset($_POST[$k])) {
            throw_error('KEY NOT FOUND: ' . $k);
        }
    }

    /**
     * Obtiene parámetros
     */
    $item_name = $db->real_escape_string(htmlspecialchars($_POST["item-name-search"]));

    /**
     * Validación búsqueda
     */
    if (!validate_string_size($item_name, 3, -1)) {
        throw_error("SEARCH NOT VALID");
    }

    /**
     * Se obtienen nombres de artículo similares
     */
    $items = item_download_by_search($db, $item_name);

    /**
     * Retorna OK y fecha del comentario
     */
    $data = array("error" => "", "items" => $items);
    echo json_encode($data);
    $db->close();
} else {
    throw_error("NOT POST");
}