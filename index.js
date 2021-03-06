const path = require('path');
const ruta = path.resolve(process.argv[2]);
console.log(ruta);
const fetch = require('node-fetch');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
fs = require('fs');

/*fs.readFile(ruta, 'utf-8', function (err,data){
    if(err) throw err;
    {
       //console.log(err);
    }
    extraerLinks(data);
    console.log(data);
});*/


//npm install --save marked
const Marked = require('marked');

// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function extraerLinks(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279


  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
 renderer.image = function(href, title, text) {
      // Remove image size at the end, e.g. ' =20%x50'
      href = href.replace(/ =\d*%?x\d*%?$/, '');
      links.push({
        href: href,
        text: text,
        title: title,
      });
  };
  Marked(markdown, {renderer: renderer});
  validarLinks(links)
  console.log(links)
   return links;

}

/*function traerStatus(url, status){//funcion que se ejecutara en caso de que el link este correcto
  console.log(url + " ok " + status);// me junta mi link con ok y el status
}
function statusFallido(url, status){//funcion que se ejecutara en caso de que el link falle
  console.log(url + " fail " + status);
}

/*function validarLinks(links) {
  links.forEach(element => {//recorro mi objeto links
    let url = element.href;//guardo en una variable solo la propiedad link de mi objeto
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      traerStatus(url, xhttp.status);
    } else if ( xhttp.readyState == 4 && xhttp.status != 200 ){
      statusFallido(url, xhttp.status);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
  })
}
*/

function leerArchivo(ruta){
  return new Promise((resolve, reject)=>{
    fs.readFile(ruta, 'utf-8', (error, data)=>{
      if(error){
        return reject(error);
      }
      return resolve(extraerLinks(data));
    });
  });
}

const validarLinks= (links) =>{
  let promises = links.map(element => {//recorro mi objeto links
    let url = element.href;
  let promise = new Promise((resolve, reject)=>{
    xhttp.onreadystatechange = function() {
      element.status = xhttp.status;
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        return resolve (element);
      } else if ( xhttp.readyState == 4 && xhttp.status != 200 ){
        return resolve (element);
      } else {
        element.error = "No se pudo conectar";
        return resolve (element);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  });
  return promise;
});
  return Promise.all(promises);
  leerArchivo(ruta)
.then((validarLink)=>{
  return validarLinks(links);
  
  
}).then((linksConStatus)=>{

}).catch(error=> console.error(error));

}
//================================Petición de promesa=======================================
leerArchivo(ruta)
.then(()=>{
  return validarLinks(links);
}).then((promises)=>{

}).catch(error=> console.error(error));
