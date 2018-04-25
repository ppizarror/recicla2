/**
 COMMENT
 Comentarios de los artículos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
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
    this._date = options.date;
    this._user = options.user;

    /**
     * Retorna el objeto de la fecha
     * @return {string}
     */
    this.getDate = function () {
        let $a = self._date.date.format('Y/m/d ');
        let $b = self._date.date.format('H:m:s');
        return lang.comment_date_format.format($a, $b);
    };

    /**
     * Retorna el nombre del autor del comentario
     * @return {string|*}
     */
    this.getUser = function () {
        return self._user;
    };

    /**
     * Retorna el comentario mismo
     * @return {string|*}
     */
    this.getComment = function () {
        return self._comment;
    };
}