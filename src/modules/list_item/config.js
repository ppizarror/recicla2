/**
 LIST ITEM CONFIG
 Configuraciones del módulo.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Centra el contenido en la ventana
 * @type {boolean}
 */
var cfg_listitem_center_module = true;

/**
 * Caracteres máximos nombre artículo
 * @type {number}
 */
var cfg_listitem_max_chars_name = 30;

/**
 * ms requeridos para mostrar tooltip
 * @type {number}
 */
var cfg_listitem_user_hoverdelay_tooltip_maxchars = 1000;

/**
 * Arreglo de ítems cargados desde el servidor
 * @type {object}
 * @ignore
 */
var items;

/**
 * Almacena contador página previa
 * @ignore
 */
var list_item_prev_page;

/**
 * Almacena contador página posterior
 * @ignore
 */
var list_item_next_page;