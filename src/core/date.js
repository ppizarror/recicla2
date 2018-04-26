/**
 DATE
 Colección de funciones asociadas al manejos de fechas.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Crea un objeto de Fecha
 * @param {number} day      Día
 * @param {number} month    Mes
 * @param {number} year     Año
 * @param {number} hour     Hora
 * @param {number} min      Minuto
 * @param {number} sec      Segundo
 * @return {object}         Retorna objeto con fechas
 */
function createDateElement(day, month, year, hour, min, sec) {
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);
    hour = parseInt(hour);
    min = parseInt(min);
    sec = parseInt(sec);

    // Crea objeto fecha
    let date = new Date(year, month, day, hour, min, sec);
    return {
        date: date,
        day: day,
        hour: hour,
        min: min,
        month: month,
        sec: sec,
        year: year
    }
}

/**
 * Crea un objeto dateElement a partir de un string del servidor.
 * @param stime
 */
function createDateFromServerTime(stime) {
    stime = stime.split(' ');
    let $d = stime[0].split('-');
    let $h = stime[1].split(':');
    return createDateElement($d[2], $d[1], $d[0], $h[0], $h[1], $h[2]);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Convierte un objeto date desde el servidor al local
 * @param {object} date     Objeto tipo DateElement
 * @return {object}         Objeto local tipo DateElement
 */
function dateElementParser(date) {
    return createDateElement(date.day, date.month - 1, date.year, date.hour, date.min, date.sec);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Crea un objeto de fecha local
 * @return {object}     Retorna fecha de hoy
 */
function getLocalDateElement() {
    return getDateElement(0, 0, 0, 0, 0, 0);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Crea un objeto de fecha local
 * @return {object}     Retorna la fecha de ayer
 */
function getYesterdayDateElement() {
    return getDateElement(-1, 0, 0, 0, 0, 0);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Crea una fecha random entre el día actual y el principio de año
 * @return {object}     Fecha random
 */
function getRandomDateElement() {
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    let d = randomDate(new Date(2018, 0, 1), new Date());
    return createDateElement(d.getDate(), d.getMonth(), d.getFullYear(), d.getHours(), d.getMinutes(), d.getSeconds());
}

// noinspection JSUnusedGlobalSymbols
/**
 * Crea un objeto de fecha local
 * @return {object}     Retorna la fecha de mañana
 */
function getTomorrowDateElement() {
    return getDateElement(1, 0, 0, 0, 0, 0);
}

/**
 * Retorna un objeto de fecha local modificado
 * @param {number} d    Días a descontar
 * @param {number} m    Meses a descontar
 * @param {number} y    Años a descontar
 * @param {number} h    Horas a descontar
 * @param {number} mn   Minutos a descontar
 * @param {number} s    Segundos a descontar
 * @return {object}     Retorna objeto tipo DateElement
 */
function getDateElement(d, m, y, h, mn, s) {
    let day = new Date().getDate() - d;
    let hour = new Date().getHours() - h;
    let min = new Date().getMinutes() - mn;
    let month = new Date().getMonth() - m;
    let sec = new Date().getSeconds() - s;
    let year = new Date().getFullYear() - y;
    return createDateElement(day, month, year, hour, min, sec);
}