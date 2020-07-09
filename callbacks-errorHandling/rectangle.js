module.exports = (x, y, callback) => {
    if (x <= 0 || y <= 0){
        setTimeout(() => //tradicionalmete, los errores son manejados como parametros 
        callback(null, new Error("Rectangle dimensions should be greater than zero: l = "
        + x + ", and b = " + y)) //objeto error, el cual tiene un atributo message
        , 2000)
    }
    else{
        setTimeout(() => 
        callback({
            perimeter: () => (2*(x+y)), 
            area: () => (x*y)
        }, null)
        , 2000)
    }
}