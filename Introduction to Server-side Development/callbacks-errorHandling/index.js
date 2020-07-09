var rect = require('./rectangle')

function solveRect(l, b){
    console.log(`Solving for rectangle whit l = ${l} and b = ${b}`)

    //Usualmente se coloca primero el err, luego el resultado, pero queria comprobar algo...
    rect(l,b, (rectangle, err) => {
        if (err) {
	        console.log("ERROR: ", err.message);
	    }
        else {
            console.log("The area of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.area());
            console.log("The perimeter of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.perimeter());
        }
    });
    console.log("This statement after the call to rect()");
   
}

solveRect(2, 4)
solveRect(3, 5)
solveRect(0, 5)
solveRect(-3, 5)