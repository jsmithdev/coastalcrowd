import { LightningElement, api } from 'lwc';

export default class Toast extends LightningElement {
	title = '';
	message = '';
	variant = 'info';
	autoCloseTime = 4000;
	autoClose = false;
	static = false;

	closed = true;

	connectedCallback() {
		window.addEventListener('toast', e => this.open( e ));
	}

	close() {
		//this.template.querySelector('.container').classList.toggle('')

		this.dispatchEvent(new CustomEvent('dismiss'));
	}

	get toastClasses() {
		return `toast ${
			this.static ? 'no-index' : ''
		}${
			this.closed ? ' close ' : ''
		}`;
	}

	get contentClasses() {
		return `content theme_${this.variant}`;
	}


	@api 
	open (event) {

		const { title, message, variant, mode, duration } = event.detail;

		this.title = title ? title : '';
		this.message = message;
		this.variant = variant;
		this.closed = false;

		if (mode !== 'sticky') {
			setTimeout(() => this.close(), duration || 4000);
		}
	}

	@api
	close () {
		this.closed = true;
	}
}
