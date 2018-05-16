/**
 COMMENT
 Comentarios de los artículos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Valida un email
 * @function
 * @param {string} $email - Email
 * @return {boolean}
 * @ignore
 */
function validateCommentEmail($email) {
    $email = $.trim($email);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String($email).toLowerCase());
}

/**
 * Valida un número de teléfono
 * @function
 * @param {string} $tel - Número de teléfono
 * @return {boolean}
 * @ignore
 */
function validateCommentPhone($tel) {
    if (!/^\d+$/.test($tel)) {
        return false;
    }
    return ($tel.length === 9 && $tel[0] === '9') || $tel.length === 11 && $tel.substring(0, 2) === '569';
}

/**
 * Comentario de un Ítem
 * @class
 * @param {object} options - Opciones de creación
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
     * Retorna el objeto de la fecha
     * @function
     * @return {string}
     */
    this.getDate = function () {
        let $a = this._date.year + '/' + padLeft(this._date.day, 2) + '/' + padLeft(this._date.month, 2) + ' ';
        let $b = padLeft(this._date.hour, 2) + ':' + padLeft(this._date.min, 2) + ':' + padLeft(this._date.sec, 2);
        return lang.comment_date_format.format($a, $b);
    };

    /**
     * Retorna el nombre del autor del comentario
     * @function
     * @return {string|*}
     */
    this.getUser = function () {
        return self._user;
    };

    /**
     * Retorna el comentario mismo
     * @function
     * @return {string|*}
     */
    this.getComment = function () {
        /**
         * Se identifica email o teléfono
         */
        let $words = self._comment.split(' ');
        for (let $i = 0; $i < $words.length; $i++) {
            if (validateCommentEmail($words[$i])) {
                // noinspection QuirksModeInspectionTool
                $words[$i] = '<a href="mailto:matias@faisbun.com" class="disable-a-hover">{0}</a>'.format($words[$i]);
            } else if (validateCommentPhone($words[$i].replace('+56', ''))) {
                $words[$i] = $words[$i].replace('+56', '');
                // noinspection QuirksModeInspectionTool
                $words[$i] = '<a href="tel:{0}" class="disable-a-hover">+56{0}</a>'.format($words[$i]);
            }
        }
        return $words.join(' ');
    };
}