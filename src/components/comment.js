/**
 COMMENT
 Comentarios de los artículos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

function Comment(options) {
    var self = this;
    let $defaults = {
        comment: '',
        user: ''
    };
    options = $.extend($defaults, options);

    // Instancia variables
    this._comment = options.comment;
    this._user = options.user;

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