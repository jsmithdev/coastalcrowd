import { api, LightningElement } from 'lwc';

export default class Card extends LightningElement {
    @api 
    get isLarge() {
        return this._isLarge;
    }
    set isLarge(value) {
        console.log('isLarge: ', value);
        this._isLarge = value;
    }

    renderedCallback() {
        if (this.isLarge) {
            this.template.querySelector('.container').classList.add('large');
            this.template.querySelector('.card').classList.add('large');
        }
    }
}
