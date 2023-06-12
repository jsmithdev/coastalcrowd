import { api, LightningElement } from "lwc";


export default class AppLayout extends LightningElement {

	@api appName = "App Layout";
	@api menuHeader = "Menu";
	@api sideItems = [];
	@api hideFooter = false

	@api
	get currentView() {
		return this._currentView;
	}
	set currentView(value) {
		if (!value || value === this._currentView) return;
		if(this.drawer) this.drawer.currentView = value;
		this._currentView = value;
	}

	get isLarge() {
		return window.innerWidth > 850;
	}

	get container() {
		return this.template.querySelector(".container");
	}
	get content() {
		return this.template.querySelector(".content");
	}
	get menuIcon() {
		return this.template.querySelector("main-menu-icon");
	}
	get drawer() {
		return this.template.querySelector("main-drawer");
	}
	get classContent() {
		return `content ${this.hideFooter ? "" : "hasFooter"}`
	}

	renderedCallback() {

		//if(!this._init)
		/* this.template
			.querySelector(".menu")
			.appendChild(document.createElement("menu-icon")); 

		this.drawer = document.createElement("menu-drawer");

		this.template.querySelector(".drawer").appendChild(this.drawer);

		this.drawer.items = this.sideItems;
		this.drawer.currentView = this.currentView;
		*/
		this.resize()
	}

	toggleDrawer() {
		this.isDrawer = this.isDrawer ? false : true;

		if (this.isDrawer) {
			this.content.classList.remove("close");
			this.content.classList.add("open");
			if (!this.isLarge) this.menuIcon.toggle(true);
		} else {
			this.content.classList.remove("open");
			this.content.classList.add("close");
			if (!this.isLarge) this.menuIcon.toggle(false);
		}
	}

	closeDrawer() {
		// ignore if large
		if (this.isLarge) return;
		// toggle icon and drawer
		this.menuIcon.toggle(false);
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
			//this.container.classList.add("large");
			this.container.classList.add("open");
			this.menuIcon.hide(true);
		} else {
			this.isDrawer = false;
			//this.container.classList.remove("large");
			this.content.classList.remove("open");
			this.content.classList.add("close");
			this.menuIcon.hide(false);
			this.menuIcon.toggle(false);
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
