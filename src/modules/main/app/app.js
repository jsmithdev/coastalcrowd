import { track, LightningElement } from 'lwc';

export default class App extends LightningElement {

	things = [
		'home',
		'settings',
	]

	currentView = 'home';
	offline = false;
	hideViews = false;
	loading = false;
	
	get toaster(){
		return this.template.querySelector('ui-toast')
	}

	/**
	 * 
	 * @param {CustomEvent} e - event who's detail is used to toast (falsey will close)
	 * @returns 
	 */
	toast(e){

		if(!e) return this.toaster.close();

		this.toaster.open(e);
	}

	async connectedCallback() {
		if (this._init) {
			return;
		}

		this._init = true;

		console.log('App Ready');
	}

	navigate(event) {

		const { name } = event.detail;

		if (name !== this.currentView) {
			this.currentView = name;
		}
	}

	setListeners() {

		window.addEventListener('load', () => window.history.pushState({}, ''));

		window.addEventListener('popstate', () => window.history.pushState({}, ''));

		window.addEventListener('online', () => this.isOnline());

		window.addEventListener('offline', () => this.isOffline());
	}

	isOnline() {
		this.offline = false;
	}
	isOffline() {
		this.offline = true;
	}

	reload(hard) {
		if (hard) {
			const form = document.createElement('form');
			form.method = 'GET';
			form.action = window.location.href;
			document.body.appendChild(form);
			form.submit();
		} else {
			window.location.reload();
		}
	}
}
