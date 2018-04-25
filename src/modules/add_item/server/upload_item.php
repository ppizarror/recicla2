<?php
/**
 * Carga el ítem al servidor.
 * @author Pablo Pizarro R. @ppizarror.com
 * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

function throw_error(){

}


if ($_POST) {

    // Verifica que se tenga el largo adecuado del post
    print_r(count(array_keys($_POST)));

    $total_pics = $_POST['foto-counter'];
    if(is_int($total_pics)){}

}