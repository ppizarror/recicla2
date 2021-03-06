/**
 ITEM
 Items de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Crea un nuevo ítem (Artículos)
 * @function
 * @class
 * @param {object} options - Opciones de creación
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

    /**
     * Convierte comentarios
     * @function
     * @static
     */
    let $convertCList = function ($comments) {
        let $clist = [];
        for (let $i = 0; $i < $comments.length; $i++) {
            $clist.push(new ItemComment($comments[$i]));
        }
        return $clist;
    };

    // Variables de instancia
    this._c = options.comuna;
    this._comments = $convertCList(options.comments);
    this._date = createDateFromServerTime(options.date);
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
     * @function
     * @return {string|*}
     */
    this.getID = function () {
        return self._objid;
    };

    /**
     * Obtiene la descripción del artículo
     * @function
     * @return {string|*}
     */
    this.getDescription = function () {
        return self._description.replace(/\n/g, '<br>');
    };

    /**
     * Obtiene la fecha del artículo
     * @function
     * @return {string}
     */
    this.getDate = function () {
        let $d = padLeft(this._date.day, 2) + '/' + padLeft(this._date.month, 2) + '/' + this._date.year;
        $d += ' ' + padLeft(this._date.hour, 2) + ':' + padLeft(this._date.min, 2) + ':' + padLeft(this._date.sec, 2);
        return $d;
    };

    /**
     * Retorna la fecha de publicación del artículo
     * @function
     * @return {string}
     */
    this.getPublishDate = function () {
        let $a = padLeft(this._date.day, 2) + '/' + padLeft(this._date.month, 2) + '/' + this._date.year + ' ';
        let $b = padLeft(this._date.hour, 2) + ':' + padLeft(this._date.min, 2) + ':' + padLeft(this._date.sec, 2);
        return lang.comment_date_format.format($a, $b);
    };

    /**
     * Retorna el nombre del artículo
     * @function
     * @return {string|*}
     */
    this.getName = function () {
        return self._name;
    };

    /**
     * Retorna la comuna del artículo
     * @function
     * @return {string|*}
     */
    this.getComuna = function () {
        return self._c;
    };

    /**
     * Retorna la región del artículo
     * @function
     * @return {string}
     */
    this.getRegion = function () {
        return self._r;
    };

    /**
     * Retorna las fotos del artículo
     * @function
     * @return {Array|*}
     */
    this.getPhotos = function () {
        return self._photos;
    };

    /**
     * Retorna el total de fotos del artículo
     * @function
     * @return {number}
     */
    this.getTotalPhotos = function () {
        return self._photos.length;
    };

    /**
     * Retorna el nombre del usuario
     * @function
     * @return {string|*}
     */
    this.getUserName = function () {
        return self._user_name;
    };

    /**
     * Retorna el correo del usuario
     * @function
     * @return {string|*}
     */
    this.getUserEmail = function () {
        return self._user_email;
    };

    /**
     * Retorna la calle del usuario
     * @function
     * @return {string|*}
     */
    this.getUserStreet = function () {
        return self._user_street;
    };

    /**
     * Retorna el número de teléfono del usuario
     * @function
     * @return {string|*}
     */
    this.getUserPhone = function () {
        return self._user_phone;
    };

    /**
     * Retorna los comentarios
     * @function
     * @return {Array|ItemComment}
     */
    this.getComments = function () {
        return self._comments;
    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Añade un comentario
     * @function
     * @param {string} user - Nombre del usuario
     * @param {string} comment - Comentario
     * @param {object} date - Fecha
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
     * @function
     * @return {number}
     */
    this.getTotalComments = function () {
        return self._comments.length;
    };
}