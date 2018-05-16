/**
 DATE
 Colección de funciones asociadas al manejos de fechas.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Crea un objeto de Fecha
 * @function
 * @param {number} day - Día
 * @param {number} month - Mes
 * @param {number} year - Año
 * @param {number} hour - Hora
 * @param {number} min - Minuto
 * @param {number} sec - Segundo
 * @return {object} - Retorna objeto con fechas
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
 * Crea un objeto dateElement a partir de un string del servidor
 * @function
 * @param stime
 * @return {object}
 */
function createDateFromServerTime(stime) {
    stime = stime.split(' ');
    let $d = stime[0].split('-');
    let $h = stime[1].split(':');
    return createDateElement($d[2], $d[1], $d[0], $h[0], $h[1], $h[2]);
}