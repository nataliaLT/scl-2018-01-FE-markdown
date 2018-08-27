const path = require('path')

function probandoTest(ruta){
    return path.extname(ruta)
}
console.log(probandoTest("README.md"))
