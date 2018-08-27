const path = require('path');
const ruta= path.resolve('src/README.md');
//const fetch = require('node-fetch');

fs = require('fs');

fs.readFile(ruta, 'utf-8', function (err,data){
    if(err) throw err;
    {
        console.log(err);
    }
    extraerLinks(data);
   // console.log(data);
});


const Marked = require('marked');
function extraerLinks(markdown){
    const links = [];
    const renderer = new Marked.Renderer();
    const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

    Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
    Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
    Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

    renderer.link= function(href, title, text,status){
        links.push({
            href: href,
            text: text,
            title: title,
            status: response.status
        });
        renderer.image =  function(href, title, text,status){
            href= href.replace(/ =\d*%?x\d*%?$/, '');
            links.push({
                href: href,
                text: text,
                title: title,
                status: status
            });
        };
        Marked(markdown,{renderer: renderer});
        //return links;
    }
   console.log(links);
}