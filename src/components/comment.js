/**
 COMMENT
 Comentarios de los artículos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Valida un email.
 * @param $input
 * @returns {{message: string, status: boolean}}
 */
function validateAddItemEmail($input) {
    let email = $input.val();
    email = $.trim(email);
    $input.val(email);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let s = re.test(String(email).toLowerCase());

    // Genera el estado
    let st = {
        message: lang.add_item_form_bad_email,
        status: s,
    };
    validateAddItemChangeStyleInput($input, st);

    return st;
}

/**
 * Comentario de un Ítem
 * @param options
 * @constructor
 */
function ItemComment(options) {
    let self = this;
    let $defaults = {
        comment: '',
        date: {},
        user: ''
    };
    options = $.extend($defaults, options);

    // Instancia variables
    this._comment = options.comment;
    this._date = createDateFromServerTime(options.date);
    this._user = options.user;

    /**
     * Retorna el objeto de la fecha.
     * @return {string}
     */
    this.getDate = function () {
        let $a = this._date.year + '/' + padLeft(this._date.day, 2) + '/' + padLeft(this._date.month, 2) + ' ';
        let $b = padLeft(this._date.hour, 2) + ':' + padLeft(this._date.min, 2) + ':' + padLeft(this._date.sec, 2);
        return lang.comment_date_format.format($a, $b);
    };

    /**
     * Retorna el nombre del autor del comentario.
     * @return {string|*}
     */
    this.getUser = function () {
        return self._user;
    };

    /**
     * Retorna el comentario mismo.
     * @return {string|*}
     */
    this.getComment = function () {
        /**
         * Se identifica email o teléfono
         */

        return self._comment;
    };
}