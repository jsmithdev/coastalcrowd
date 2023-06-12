import { LightningElement } from "lwc";

import {
	//getItems,
	setItem,
	setItems,
} from "../../db/db.js";

export default class App extends LightningElement {

	currentView = this.views[0];
	offline = false;
	hideViews = false;
	loading = false;
	searchVariant = 'inverse';

	get views() {
		// set in webpack.config.js
		// eslint-disable-next-line no-undef
		return this.configViews(__VIEWS__) || [];
	}

	get toaster() {
		return this.template.querySelector("ui-toast");
	}

	/**
	 *
	 * @param {CustomEvent} e - event who's detail is used to toast (falsey will close)
	 */
	toast(e) {
		if (!e) return this.toaster.close();

		this.toaster.open(e);

		return undefined;
	}

	async connectedCallback() {
		if (this._init) {
			return;
		}

		this._init = true;

		await this.loadProjects();

		console.log("App Ready");
	}

	navigate(event) {
		const { name } = event.detail;

		if (name !== this.currentView) {
			this.currentView = name;
		}
	}

	setListeners() {
		window.addEventListener("load", () => window.history.pushState({}, ""));

		window.addEventListener("popstate", () => window.history.pushState({}, ""));

		window.addEventListener("online", () => this.isOnline());

		window.addEventListener("offline", () => this.isOffline());
		
		window.addEventListener("toast", (e) => this.toast(e));
	}

	isOnline() {
		this.offline = false;
	}
	isOffline() {
		this.offline = true;
	}

	reload(hard) {
		if (hard) {
			const form = document.createElement("form");
			form.method = "GET";
			form.action = window.location.href;
			document.body.appendChild(form);
			form.submit();
		} else {
			window.location.reload();
		}
	}

	shouldUpdate() {
		const time = localStorage.getItem("updated");
		if (!time) return true;
		const stamp = Number(time);
		const now = new Date().getTime();
		const diff = now - stamp;
		const minutes = diff / 1000 / 60;
		return minutes > 5;
	}

	async loadProjects() {
		// todo - check for updates check
		//const has = await getItems("projects");
		//if (has.length && !this.shouldUpdate()) return;

		localStorage.setItem("updated", new Date().getTime());

		const url = this.getUrl(
			"jsmithdev",
			"component-land-data",
			"main",
			"lwc-data.json"
		);

		const json = await (await fetch(url)).json();

		const projects = json.map((p) => {
			return Object.assign(p, {
				get isSolution() {
					return `https://github.com/${p.author}/${p.name}.git`;
				},
				get isDevelopment() {
					return `https://github.com/${p.author}/${p.name}.git`;
				},
				get url() {
					return `https://github.com/${p.author}/${p.name}/tree/${p['deploy-branch'] || 'master'}']}`;
				},
				get markdown() {
					return `https://raw.githubusercontent.com/${p.author}/${p.name}/${p['deploy-branch'] || 'master'}/README.md`;
				},
			});
		});

		await setItems(projects);

		await this.handleShared(projects);
	}

	getUrl(user, repo, branch, filename) {
		return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${filename}`;
	}

	async handleShared(projects) {

		const params = (new URL(document.location)).searchParams;
		const share = params.get('share')

		if (!share) return console.log('nothing shared');

		const data = decodeURIComponent(share)
		const author = data.substring(0, data.indexOf('/'))
		const repo = data.substring(data.indexOf('/') + 1, data.length)

		const record = projects.find(item => item.name === repo && item.author === author)

		await setItem(record, 'shared')

		this.currentView = 'shared'

		return undefined
	}

	configViews(views) {
		const ordered = ['home', 'solutions']
		return [
			...ordered,
			...views
				.filter(view => !ordered.includes(view))
				.filter(view => view !== 'search'),
		]
	}

	toggleSearch() {
		if(this.currentView === 'search'){
			this.currentView = this.lastView;
			this.searchVariant = 'inverse';
		}
		else {
			this.lastView = this.currentView;
			this.currentView = 'search';
			this.searchVariant = 'warning';
		}
	}
}