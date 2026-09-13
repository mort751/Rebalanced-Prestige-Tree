
function exponentialFormat(num, precision, mantissa = true) {
    let e = Math.floor(Math.log10(num))
    let m = num / Math.pow(10, e)
    if (m.toFixed(precision) == "10") {
        m = 1
        e++
    }
    e = (e >= 1e9 ? format(e, 3) : (e >= 10000 ? commaFormat(e, 0) : e.toString()))
    if (mantissa)
        return m.toFixed(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (Math.abs(num) < 0.001) return (0).toFixed(precision)
    let init = num.toFixed(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (Math.abs(num) < 0.0001) return (0).toFixed(precision)
    if (Math.abs(num) < 0.1 && precision !== 0) precision = Math.max(precision, 4)
    return num.toFixed(precision)
}

function fixValue(x, y = 0) {
    return x || y
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return 0
    return x.reduce((a, b) => a + b)
}

function format(num, precision = 2, small) {
    small = small || modInfo.allowSmall
    num = Number(num);
    if (isNaN(num)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (num < 0) return "-" + format(-num, precision, small)
    if (num === Infinity) return "Infinity"
    else if (num >= 1e9) return exponentialFormat(num, precision)
    else if (num >= 1e3) return commaFormat(num, 0)
    else if (num >= 0.0001) || !small) return regularFormat(num, precision)
    else if (num == 0) return (0).toFixed(precision)

    num = invertOOM(num)
    let val = "";
    val = exponentialFormat(num, precision)
    return val.replace(/([^(?:e|F)]*)$/, '-$1')
}

function formatWhole(num) {
    num = Number(num);
    if (num >= (1e9)) return format(num, 2)
    if (num <= (0.99) && !(num==0)) return format(num, 2)
    return format(num, 0)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = Number(x);
    let result = x.toFixed(precision)
    if (Number(result)>=(maxAccepted)) {
        result = (maxAccepted - Math.pow(0.1, precision)).toFixed(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = Math.ceil(Math.log10(x))
    let m = x / Math.pow(10, e)
    e = -e;
    x = Math.pow(10, e) * m

    return x
}
