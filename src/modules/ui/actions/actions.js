/* eslint-disable no-restricted-globals */
/* eslint-disable @lwc/lwc/no-api-reassignments */
import { api, LightningElement } from "lwc";

import { generateUUID } from '../../utils/strings.js'
import { copyTextToClipboard } from '../../utils/clipboard.js'

export default class Actions extends LightningElement {

	@api item = {};

	action = "";
	success = false;
	port = location.hostname === "localhost" ? `:${location.port}` : "";
	host = `${location.protocol}//${location.hostname}${this.port}`;

	get actions() {
		return [
			{
				label: "Copy Link",
				value: "share",
				success: "Copied successfully!",
			},
			{
				label: "Open Project",
				value: "open_repo",
			},
			{
				label: "Deploy to Salesforce",
				value: "deploy",
			},
			//{
			//	label: "Deploy to Dev/Prod",
			//	value: "deploy_production",
			//},
		];
	}

	get name() {
		return this.item.name ? this.item.name : "";
	}
	get author() {
		return this.item.author ? this.item.author : "";
	}
	get deployBranch() {
		return this.item['deploy-branch'] || 'master';
	}
	get urls() {
		return {
			share: `${this.host}?share=${encodeURIComponent(
				`${this.author}/${this.name}`
			)}`,
			deploy_production: `https://githubsfdeploy.herokuapp.com/app/githubdeploy/${this.author}/${this.name}&ref=${this.deployBranch}`,
			deploy_sandbox: `https://githubsfdeploy-sandbox.herokuapp.com/app/githubdeploy/${this.author}/${this.name}&ref=${this.deployBranch}`,
			deploy: `https://githubsfdeploy.herokuapp.com/?owner=${this.author}&repo=${this.name}&ref=${this.deployBranch}`,
			open_repo: `https://github.com/${this.author}/${this.name}`,
		};
	}
	get id() {
		return generateUUID();
	}

	preformAction(event) {

		const value = event.detail?.value || event.target.value;

		if(value === 'details') {
			return this.dispatch('details');
		}

		const url = this.urls[value];

		if (value === "share") {
			return this.share(url);
		}
		
		return window.open(url, "_blank");
	}

	share(url) {

		const success = copyTextToClipboard(url);

		if(success) {
			return this.toast({
				success,
				message: "Copied successfully!",
				variant: "success",
			})
		}
		return this.toast({
			message: "Could not copy to clipboard",
			variant: "error",
		})
	}
	
	toast(detail){
		this.dispatch('toast', detail);
	}

	dispatch(name, detail){
		this.dispatchEvent(new CustomEvent(name, {
			bubbles: true,
			composed: true,
			detail,
		}))
	}
}
