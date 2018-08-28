const path = require('path');
const ruta= path.resolve(path.join(process.cwd(), 'README.md'));
console.log(ruta)
//const fetch = require('node-fetch');

fs = require('fs');

fs.readFile(ruta, 'utf-8', function (err,data){
    if(err) throw err;
    {
       console.log(err);
    }
    extraerLinks(data);
   
});

//npm install --save marked
const Marked = require('marked');

// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function extraerLinks(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

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
  console.log(links)
  return validarLinks(data);
  console.log(validarLinks())
};
//funcion para validar los links 
function validarLinks(links){
  links.forEach(element=>{
    const http = require('http');
    fetch(http.get(links,(res)=>{
      const {statusCode} = res;
    })).then(response => response

  ).then(data =>{
    if(data.statusCode === 200){
      console.log('ok')
    }
  }).catch(error =>{
    console.log ('fail')
  })
  })
  
}

