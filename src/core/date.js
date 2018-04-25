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

/**
 * Formatea las fechas
 */
(function () {
    function g(a, c) {
        a.setHours(a.getHours() + parseFloat(c));
        return a
    }

    function h(a, c) {
        let b = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
        return c ? b[a.getDay()].substr(0, 3) : b[a.getDay()]
    }

    function k(a, c) {
        let b = "January February March April May June July August September October November December".split(" ");
        return c ? b[a.getMonth()].substr(0, 3) : b[a.getMonth()]
    }

    function e(a, c) {
        if (a) {
            if ("compound" === a) {
                if (!1 === c) return this.format.compound;
                // noinspection JSDuplicatedDeclaration
                let b = {}, d;
                for (d in Date.prototype.format.compound) { // noinspection JSUnfilteredForInLoop
                    b[d] =
                        this.format(Date.prototype.format.compound[d]);
                }
                return b
            }
            if (Date.prototype.format.compound[a]) return this.format(Date.prototype.format.compound[a], c);
            if ("constants" === a) {
                if (!1 === c) return this.format.constants;
                let b = {};
                for (let d in Date.prototype.format.constants) { // noinspection JSUnfilteredForInLoop
                    b[d] = this.format(Date.prototype.format.constants[d]);
                }
                return b
            }
            if (Date.prototype.format.constants[a]) return this.format(Date.prototype.format.constants[a], c);
            if ("pretty" === a) {
                if (!1 === c) return this.format.pretty;
                let b = {};
                for (let d in Date.prototype.format.pretty) { // noinspection JSUnfilteredForInLoop
                    b[d] =
                        this.format(Date.prototype.format.pretty[d]);
                }
                return b
            }
            if (Date.prototype.format.pretty[a]) return this.format(Date.prototype.format.pretty[a], c);
            // noinspection JSDuplicatedDeclaration
            let b = a.split(""), e = "";
            for (let d in b) {
                // noinspection JSUnfilteredForInLoop
                let f = b[d];
                // noinspection JSUnfilteredForInLoop
                f && /[a-z]/i.test(f) && !/\\/.test(e + f) && (b[d] = l[f] ? l[f].apply(this) : f);
                // noinspection JSUnfilteredForInLoop
                e = b[d]
            }
            return b.join("").replace(/\\/g, "")
        }
        return a
    }

    let l = {
        d: function () {
            let a = this.getDate();
            return 9 < a ? a : "0" + a
        },
        D: function () {
            return h(this, !0)
        },
        j: function () {
            return this.getDate()
        },
        l: function () {
            return h(this)
        },
        /**
         * @return {number}
         */
        N: function () {
            return this.getDay() + 1;
        },
        /**
         * @return {string}
         */
        S: function () {
            let a = this.getDate();
            // noinspection JSCheckFunctionSignatures
            return /^1[0-9]$/.test(a) ? "th" : /1$/.test(a) ? "st" : /2$/.test(a) ? "nd" : /3$/.test(a) ? "rd" : "th"
        },
        w: function () {
            return this.getDay()
        },
        z: function () {
            return Math.round(Math.abs((this.getTime() - (new Date("1/1/" + this.getFullYear())).getTime()) / 864E5))
        },
        /**
         * @return {number}
         */
        W: function () {
            let a = new Date(this.getFullYear(), 0, 1);
            return Math.ceil(((this - a) / 864E5 + a.getDay() + 1) / 7)
        },
        F: function () {
            return k(this)
        },
        m: function () {
            let a = this.getMonth() + 1;
            return 9 < a ? a : "0" + a
        },
        M: function () {
            return k(this, !0)
        },
        n: function () {
            return this.getMonth() +
                1
        },
        t: function () {
            return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate()
        },
        /**
         * @return {boolean}
         */
        L: function () {
            let a = this.getFullYear();
            return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400
        },
        o: function () {// noinspection JSCheckFunctionSignatures
            return parseInt(this.getFullYear())
        },
        Y: function () {// noinspection JSConstructorReturnsPrimitive
            // noinspection JSConstructorReturnsPrimitive
            return parseInt(this.getFullYear())
        },
        y: function () {
            return parseInt((this.getFullYear() + "").substr(-2))
        },
        a: function () {
            return 12 <= this.getHours() ? "pm" : "am"
        },
        A: function () {// noinspection JSConstructorReturnsPrimitive
            return 12 <= this.getHours() ? "PM" : "AM"
        },
        /**
         * @return {string}
         */
        B: function () {
            return "@" + ("00" + Math.floor((60 * ((this.getHours() + 1) % 24 * 60 + this.getMinutes()) +
                this.getSeconds() + .001 * this.getMilliseconds()) / 86.4)).slice(-3)
        },
        g: function () {
            let a = this.getHours();
            return 0 === a ? 12 : 12 >= a ? a : a - 12
        },
        /**
         * @return {number}
         */
        G: function () {
            return this.getHours()
        },
        h: function () {
            let a = this.getHours();
            a = 12 >= a ? a : a - 12;
            return 0 === a ? 12 : 9 < a ? a : "0" + a
        },
        H: function () {
            let a = this.getHours();
            return 9 < a ? a : "0" + a
        },
        i: function () {
            let a = this.getMinutes();
            return 9 < a ? a : "0" + a
        },
        s: function () {
            let a = this.getSeconds();
            return 9 < a ? a : "0" + a
        },
        u: function () {
            return this.getMilliseconds()
        },
        e: function () {
            let a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);
            return 1 < a.length ? a[1] : ""
        },
        /**
         * @return {number}
         */
        I: function () {
            let a = new Date(this.getFullYear(), 0, 1), c = new Date(this.getFullYear(), 6, 1);
            a = Math.max(a.getTimezoneOffset(), c.getTimezoneOffset());
            return this.getTimezoneOffset() < a ? 1 : 0
        },
        /**
         * @return {string}
         */
        O: function () {
            let a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);
            return 2 < a.length ? a[2] : ""
        },
        /**
         * @return {string}
         */
        P: function () {
            let a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);
            return 2 < a.length ? a[2].substr(0, 3) + ":" + a[2].substr(3, 2) : ""
        },
        T: function () {
            return this.toLocaleString("en", {timeZoneName: "short"}).split(" ").pop()
        },
        /**
         * @return {number}
         */
        Z: function () {
            return 60 * this.getTimezoneOffset()
        },
        c: function () {// noinspection JSCheckFunctionSignatures
            return g(new Date(this), -(this.getTimezoneOffset() / 60)).toISOString()
        },
        r: function () {// noinspection JSCheckFunctionSignatures
            return g(new Date(this), -(this.getTimezoneOffset() / 60)).toISOString()
        },
        /**
         * @return {number}
         */
        U: function () {
            return this.getTime() / 1E3 | 0
        }
    }, m = {
        commonLogFormat: "d/M/Y:G:i:s",
        exif: "Y:m:d G:i:s",
        isoYearWeek: "Y\\WW",
        isoYearWeek2: "Y-\\WW",
        isoYearWeekDay: "Y\\WWj",
        isoYearWeekDay2: "Y-\\WW-j",
        mySQL: "Y-m-d h:i:s",
        postgreSQL: "Y.z",
        postgreSQL2: "Yz",
        soap: "Y-m-d\\TH:i:s.u",
        soap2: "Y-m-d\\TH:i:s.uP",
        unixTimestamp: "@U",
        xmlrpc: "Ymd\\TG:i:s",
        xmlrpcCompact: "Ymd\\tGis",
        wddx: "Y-n-j\\TG:i:s"
    }, n = {
        AMERICAN: "F j, Y",
        AMERICANSHORT: "m/d/Y",
        AMERICANSHORTWTIME: "m/d/Y h:i:sA",
        ATOM: "Y-m-d\\TH:i:sP",
        COOKIE: "l, d-M-Y H:i:s T",
        EUROPEAN: "j F Y",
        EUROPEANSHORT: "d.m.Y",
        EUROPEANSHORTWTIME: "d.m.Y H:i:s",
        ISO8601: "Y-m-d\\TH:i:sO",
        LEGAL: "j F Y",
        RFC822: "D, d M y H:i:s O",
        RFC850: "l, d-M-y H:i:s T",
        RFC1036: "D, d M y H:i:s O",
        RFC1123: "D, d M Y H:i:s O",
        RFC2822: "D, d M Y H:i:s O",
        RFC3339: "Y-m-d\\TH:i:sP",
        RSS: "D, d M Y H:i:s O",
        W3C: "Y-m-d\\TH:i:sP"
    }, p = {
        "pretty-a": "g:i.sA l jS \\o\\f F, Y",
        "pretty-b": "g:iA l jS \\o\\f F, Y",
        "pretty-c": "n/d/Y g:iA",
        "pretty-d": "n/d/Y",
        "pretty-e": "F jS - g:ia",
        "pretty-f": "g:iA",
        "pretty-g": "F jS, Y",
        "pretty-h": "F jS, Y g:mA"
    };
    Object.defineProperty ? Object.defineProperty(e, "compound", {value: m}) : e.compound = m;
    Object.defineProperty ? Object.defineProperty(e, "constants", {value: n}) : e.constants = n;
    Object.defineProperty ? Object.defineProperty(e, "pretty", {value: p}) : e.pretty = p;
    Object.defineProperty && !Date.prototype.hasOwnProperty("format") ?
        Object.defineProperty(Date.prototype, "format", {value: e}) : Date.prototype.format = e
})();