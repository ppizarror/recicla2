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
    let self = this;
    let $defaults = {
        comments: [], // Comentarios del artículo
        comuna: '', // Comuna del artículo
        date: {}, // Fecha del artículo
        desc: '', // Descripción del artículo
        id: -1, // Id del objeto
        name: '', // Nombre del artículo
        photos: [], // Lista de fotos del artículo
        region: '', // Región del artículo
        userContact: '', // Nombre y contacto del usuario del artículo
        userEmail: '', // Correo del usuario
        userPhone: '', // Teléfono del usuario
        userStreet: '', // Calle del usuario
    };
    options = $.extend($defaults, options);

    // Variables de instancia
    this._c = options.comuna;
    this._comments = options.comments;
    this._date = new Date(options.date);
    this._description = options.desc;
    this._id = generateId(10);
    this._name = options.name;
    this._objid = options.id;
    this._photos = options.photos;
    this._r = options.region;
    this._user_email = options.userEmail;
    this._user_name = options.userContact;
    this._user_phone = options.userPhone;
    this._user_street = options.userStreet;

    /**
     * Retorna el ID del objeto
     * @return {string|*}
     */
    this.getID = function () {
        return self._objid;
    };

    /**
     * Obtiene la descripción del artículo
     * @return {string|*}
     */
    this.getDescription = function () {
        return self._description;
    };

    /**
     * Obtiene la fecha del artículo
     * @return {{}|date|*}
     */
    this.getDate = function () {
        return this._date.format('Y/m/d H:m:s');
    };

    /**
     * Retorna la fecha de publicación del artículo
     * @return {string}
     */
    this.getPublishDate = function () {
        let $a = this._date.format('Y/m/d');
        let $b = this._date.format('H:m:s');
        return lang.show_item_publish_date_format.format($a, $b);
    };

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
     * Retorna el total de fotos del artículo
     * @return {number}
     */
    this.getTotalPhotos = function () {
        return self._photos.length;
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
    };

    /**
     * Retorna los comentarios
     * @return {Array|ItemComment}
     */
    this.getComments = function () {
        return self._comments;
    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Añade un comentario
     * @param user
     * @param comment
     * @param date
     */
    this.addComment = function (user, comment, date) {
        self._comments.push(new ItemComment({
            comment: comment,
            date: date,
            user: user
        }));
    };

    /**
     * Retorna el número de comentarios del artículo
     * @return {number}
     */
    this.getTotalComments = function () {
        return self._comments.length;
    };
}