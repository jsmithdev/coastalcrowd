import home from "../../views/home/home.js";
customElements.define("views-home", home.CustomElementConstructor);

import components from "../../views/components/components.js";
customElements.define("views-components", components.CustomElementConstructor);

import solutions from "../../views/solutions/solutions.js";
customElements.define("views-solutions", solutions.CustomElementConstructor);

import shared from "../../views/shared/shared.js";
customElements.define("views-shared", shared.CustomElementConstructor);

import search from "../../views/search/search.js";
customElements.define("views-search", search.CustomElementConstructor);
