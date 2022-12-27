import { api, LightningElement } from 'lwc';

export default class Drawer extends LightningElement {

    @api header = 'Menu'
    
    @api items = [];

    get views(){
        
        // highlight first in list
        setTimeout(() => this.highlightItem(this.template.querySelector('div.item')), 0);
        
        return this.items.map((name, i) => ({
            name,
            label: name,
            key: `side${i}`
        }));
    }

    get version() {
		try {
			// eslint-disable-next-line no-undef
			return `v${__VERSION__}`;
		} catch (e) {
			return false;
		}
	}

    navigate(event){
        
        const { target } = event;

        this.highlightItem(target)

        const { name } = target.dataset;

        this.dispatchEvent(new CustomEvent('navigate', {
            composed: true,
            bubbles: true,
            detail: {
                name,
            }
        }))
    }

    highlightItem(el){
        if(!el) return;
        this.template.querySelectorAll('div.item').forEach(el => el.classList.remove('active'));
        el.classList.add('active');
    }
}