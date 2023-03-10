import { api, LightningElement } from 'lwc';

export default class Drawer extends LightningElement {

    @api header = 'Menu'
    
    @api items = [];

	@api
	get currentView() {
		return this._currentView;
	}
	set currentView(value) {
		if(!value) return;
		const el = this.template.querySelector(`div[data-name="${value}"]`)
		if(el) this.highlightItem(el);
		this._currentView = value;
	}

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
        this.template.querySelectorAll('div.item').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
    }
}