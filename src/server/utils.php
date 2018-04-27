<?php
/**
 * Funciones utilitarias y configuraciones generales.
 * @author Pablo Pizarro R. @ppizarror.com
 * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

const DATE_FORMAT = 'Y-m-d H:i:s';
const PHOTO_PATH = 'resources/photos/';

/**
 * This function returns the maximum files size that can be uploaded
 * in PHP
 * @returns int File size in bytes
 **/
function getMaximumFileUploadSize()
{
    return min(convertPHPSizeToBytes(ini_get('post_max_size')), convertPHPSizeToBytes(ini_get('upload_max_filesize')));
}

/**
 * This function transforms the php.ini notation for numbers (like '2M') to an integer (2*1024*1024 in this case)
 *
 * @param string $sSize
 * @return integer The value in bytes
 */
function convertPHPSizeToBytes($sSize)
{
    //
    $sSuffix = strtoupper(substr($sSize, -1));
    if (!in_array($sSuffix, array('P', 'T', 'G', 'M', 'K'))) {
        return (int)$sSize;
    }
    $iValue = substr($sSize, 0, -1);
    switch ($sSuffix) {
        /** @noinspection PhpMissingBreakStatementInspection */
        case 'P':
            $iValue *= 1024;
        // Fallthrough intended
        /** @noinspection PhpMissingBreakStatementInspection */
        case 'T':
            $iValue *= 1024;
        // Fallthrough intended
        /** @noinspection PhpMissingBreakStatementInspection */
        case 'G':
            $iValue *= 1024;
        // Fallthrough intended
        /** @noinspection PhpMissingBreakStatementInspection */
        case 'M':
            $iValue *= 1024;
        // Fallthrough intended
        case 'K':
            $iValue *= 1024;
            break;
    }
    return (int)$iValue;
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
    // Largo del string
    $l = strlen(str_replace("\r", '', str_replace("\n", '', trim($s))));

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