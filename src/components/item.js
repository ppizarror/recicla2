/**
 ITEM
 Items de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Crea un nuevo ítem (Artículos)
 * @param options
 * @constructor
 */
function Item(options) {
    var self = this;
    let $defaults = {
        comuna: '', // Comuna del artículo
        desc: '', // Descripción del artículo
        name: '', // Nombre del artículo
        photos: [], // Lista de fotos del artículo
        region: '', // Región del artículo
        userContact: '', // Nombre y contacto del usuario del artículo
        userEmail: '', // Correo del usuario
        userPhone: '', // Teléfono del usuario
        userStreet: '' // Calle del usuario
    };
    options = $.extend($defaults, options);

    // Variables de instancia
    this._c = options.comuna;
    this._id = generateId(10);
    this._name = options.name;
    this._photos = options.photos;
    this._r = options.region;
    this._user_email = options.userEmail;
    this._user_name = options.userContact;
    this._user_phone = options.userPhone;
    this._user_street = options.userStreet;

    /**
     * Retorna el nombre del artículo
     * @return {string|*}
     */
    this.getName = function () {
        return self._name;
    };

    /**
     * Retorna la comuna del artículo
     * @return {string|*}
     */
    this.getComuna = function () {
        return self._c;
    };

    /**
     * Retorna la región del artículo
     */
    this.getRegion = function () {
        return self._r;
    };

    /**
     * Retorna las fotos del artículo
     * @return {Array|*}
     */
    this.getPhotos = function () {
        return self._photos;
    };

    /**
     * Retorna el nombre del usuario
     * @return {string|*}
     */
    this.getUserName = function () {
        return self._user_name;
    };

    /**
     * Retorna el correo del usuario
     * @return {string|*}
     */
    this.getUserEmail = function () {
        return self._user_email;
    };

    /**
     * Retorna la calle del usuario
     * @return {string|*}
     */
    this.getUserStreet = function () {
        return self._user_street;
    };

    /**
     * Retorna el número de teléfono del usuario
     * @return {string|*}
     */
    this.getUserPhone = function () {
        return self._user_phone;
    }
}