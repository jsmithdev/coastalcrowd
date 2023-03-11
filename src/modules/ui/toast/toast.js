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

	get classNotify() {
		return `slds-notify slds-notify_toast slds-theme_${this.variant}`;
	}
	get classIcon() {
		return `slds-icon_container slds-m-right_small slds-no-flex slds-align-top slds-icon-utility-${this.variant}`;
	}
	get iconName() {
		return `utility:${this.variant}`;
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
