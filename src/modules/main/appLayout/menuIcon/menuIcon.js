import { api, LightningElement } from 'lwc';

export default class MenuIcon extends LightningElement {

    @api
    toggle(bool){
        // if optional bool was given, prefer it
        if(bool === true){
            this.template.querySelector('button').classList.add('opened');
        }
        else if (bool === false){
            this.template.querySelector('button').classList.remove('opened');
        }
        else {
            this.template.querySelector('button').classList.toggle('opened');
        }
        this.setAttribute('aria-expanded', this.classList.contains('opened'))
    }

    @api
    hide(bool){
        console.log('hide', bool);
        if(bool === true){
            this.template.querySelector('.menu-container').classList.add('hide');
        }
        else if (bool === false){
            this.template.querySelector('.menu-container').classList.remove('hide');
        }
        this.setAttribute('aria-expanded', this.classList.contains('opened'))
    }
}