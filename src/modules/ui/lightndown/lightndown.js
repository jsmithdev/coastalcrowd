import { api, LightningElement } from "lwc";
import Marked from "./marked";

//import hljs from './highlight';

/* const renderer = new marked.Renderer();


console.log(renderer)

function sanitize(str) {
  return str.replace(/&<"/g, function (m) {
    if (m === "&") return "&amp;"
    if (m === "<") return "&lt;"
    return "&quot;"
  })
}

renderer.image = function (src, title, alt) {

    return `<img src="${sanitize(src)}" title="${sanitize(title)}" alt="${sanitize(alt)}" height="100px" width="100px" />`

} */

//marked.setOptions({
//    highlight: function(code) {
//        console.dir(highlight.getLanguage('xml'))
//        console.dir(code)
//        return highlight.highlight(`<code class="html">${code}</code>`).value
//    }
//});

//const highlight = hljs({})

export default class lightndown extends LightningElement {
  @api url;
  @api string;
  @api baseurl;

  done = false;

  connectedCallback() {
    if (!this.init) {
      this.init = true;

      this.marked = Marked();

      this.marked.setOptions({
        renderer: new this.marked.Renderer(),
        //highlight: function(code) {
        //  return highlight.highlightAuto(code).value;
        //},
        baseUrl: this.baseurl,
        pedantic: false,
        gfm: true,
        breaks: true,
        sanitize: false,
        smartLists: true,
        smartypants: true,
        xhtml: false,
      });

      if (this.url) {
        this.getDown(this.url);
      } else if (this.string) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => this.setMarkdown(this.string), 0);
      }
    }
  }

  async getDown(url) {
    const markdown = await (await fetch(url)).text();

    this.setMarkdown(markdown);
  }

  setMarkdown(markdown) {
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    this.template.querySelector("pre").innerHTML = this.marked(markdown);
    this.done = true;
  }
}
