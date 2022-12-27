import { api, LightningElement } from 'lwc';

import './imports';

export default class View extends LightningElement {

	@api
	get view(){ return this._view }
	set view(view){
		if(!view || this.view === view) return;
		this._view = view;
		if(this._rended) this.swapViews();
	}

	get container(){
		return this.template.querySelector('.view-container');
	}

	renderedCallback(){
		if(!this._rended) this.swapViews();
		this._rended = true
	}

	swapViews(){

		while (this.container.lastElementChild) {
			this.container.removeChild(this.container.lastElementChild);
		}
		this.container.appendChild( 
			document.createElement(`views-${this.view}`)
		);
	}
}
