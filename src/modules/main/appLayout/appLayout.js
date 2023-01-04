import { api, LightningElement } from "lwc";

import './imports.js'

export default class AppLayout extends LightningElement {
  @api appName = "App Layout";
  @api menuHeader = "Menu";
  @api sideItems = [];

  get isLarge() {
    return window.innerWidth > 800;
  }

  get content() {
    return this.template.querySelector(".content");
  }

  renderedCallback() {
    this.template
      .querySelector(".menu")
      .appendChild(document.createElement("menu-icon"));

    const drawer = document.createElement("menu-drawer");

    this.template.querySelector(".drawer").appendChild(drawer);

    drawer.items = this.sideItems;

    this.resize()
  }

  toggleDrawer() {
    this.isDrawer = this.isDrawer ? false : true;

    if (this.isDrawer) {
      this.content.classList.remove("close");
      this.content.classList.add("open");
      if (!this.isLarge) this.template.querySelector("menu-icon").toggle(true);
    } else {
      this.content.classList.remove("open");
      this.content.classList.add("close");
      if (!this.isLarge) this.template.querySelector("menu-icon").toggle(false);
    }
  }

  closeDrawer() {
    // ignore if large
    if (this.isLarge) return;
    // toggle icon and drawer
    this.template.querySelector("menu-icon").toggle(false);
    this.toggleDrawer();
  }

  connectedCallback() {
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    if (this.wasLarge === this.isLarge) return;

    this.handleSize();

    if (this.isLarge) {
      this.isDrawer = true;
      this.content.classList.remove("close");
      this.content.classList.add("large");
      /* this.content.classList.add("open"); */
      this.template.querySelector("menu-icon").hide(true);
    } else {
      this.isDrawer = false;
      this.content.classList.remove("large");
      this.content.classList.remove("open");
      this.content.classList.add("close");
      this.template.querySelector("menu-icon").hide(false);
      this.template.querySelector("menu-icon").toggle(false);
    }
    this.wasLarge = this.isLarge;
  }

  handleSize() {
    /* https://github.com/w3c/csswg-drafts/issues/4329 */
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
}
