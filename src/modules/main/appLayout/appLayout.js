import { api, LightningElement } from 'lwc';

import MenuIcon from "./menuIcon/menuIcon";
import Drawer from "./drawer/drawer";

customElements.define('menu-icon', MenuIcon.CustomElementConstructor);
customElements.define('menu-drawer', Drawer.CustomElementConstructor);

export default class AppLayout extends LightningElement {

    @api appName = 'App Layout';
    @api menuHeader = 'Menu';
    @api sideItems = []

    get isLarge(){
        return window.innerWidth > 1200;
    }

    get content(){
        return this.template.querySelector('.content')
    }

    renderedCallback(){
        this.template.querySelector('.menu')
            .appendChild(document.createElement('menu-icon'))
        this.template.querySelector('.drawer')
            .appendChild(document.createElement('menu-drawer'))
        this.template.querySelector('menu-drawer')
            .items = this.sideItems;
    }

    toggleDrawer(){

        this.isDrawer = this.isDrawer ? false : true;

        if(this.isDrawer){
            this.content.classList.remove('close')
            this.content.classList.add('open');
            if(!this.isLarge) this.template.querySelector('menu-icon').toggle(true);
        }
        else {
            this.content.classList.remove('open');
            this.content.classList.add('close')
            if(!this.isLarge) this.template.querySelector('menu-icon').toggle(false);
        }
    }

    closeDrawer(){
        if(!this.isLarge) this.template.querySelector('menu-icon').toggle(false);
        this.toggleDrawer();
    }

    connectedCallback(){
        this.addEventListeners();
    }

    addEventListeners(){
        window.addEventListener('resize', () => this.resize())
    }

    resize(){

        if(this.wasLarge === this.isLarge) return;

        this.handleSize()

        if(this.isLarge){
            this.isDrawer = true;
            this.content.classList.remove('close');
            this.content.classList.add('open')
            this.template.querySelector('menu-icon').toggle(false);
        }
        else {
            this.isDrawer = false;
            this.content.classList.remove('open');
            this.content.classList.add('close')
            this.template.querySelector('menu-icon').toggle(false);
        }
        this.wasLarge = this.isLarge;
    }

    toastExample(){

        const vars = ['success', 'info', 'warning', 'error'];
        const variant = vars[Math.floor(Math.random() * vars.length)]

        this.dispatchEvent(new CustomEvent('toast', {
            bubbles: true,
            composed: true,
            detail: {
                variant,
                message: 'meow... prrrrr...',
            }
        }))
    }

    handleSize(){
        /* https://github.com/w3c/csswg-drafts/issues/4329 */
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        const vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}