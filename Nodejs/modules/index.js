var rect = require('./rectangle')

function solveRect(l, b){
    console.log(`Solving for rectangle whit l = ${l} and b = ${b}`)

    if (l<=0 || b <= 0){
        console.log(`Rectangle dimensions should be greater than zero l = ${l}, b = ${b}`)
    }else{
        console.log(`The area of the rectanglee is: ${rect.area(l,b)}`)
        console.log(`The perimter of the rectanglee is: ${rect.perimeter(l,b)}`)
    }
}

solveRect(2, 4)
solveRect(3, 5)
solveRect(0, 5)
solveRect(-3, 5)