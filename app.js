const marked = require('marked');
function markdownLinkExtractor(markdown){
    const links = [];
    const render = new Marked.Renderer();
    const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

    Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
    Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
    Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

    render.link= function(href, title, text){
        links.push({
            href: href,
            text: text,
            title: title,
        });
        renderer.image =  function(href, title, text){
            href= href.replace(/ =\d*%?x\d*%?$/, '');
            links.push({
                href: href,
                text: text,
                title: title,
            });
        };
        Marked(markdown,{renderer: renderer});
        return links;
    }
}