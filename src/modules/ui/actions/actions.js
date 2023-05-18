/* eslint-disable no-restricted-globals */
/* eslint-disable @lwc/lwc/no-api-reassignments */
import { api, LightningElement } from "lwc";

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

	preformAction({detail}) {
		const {value} = detail;
		console.log("selected", value);

		if (value === "share") {
			const url = this.urls[value];
			const success = this.copyTextToClipboard(url);
			if(success) {
				return this.toast({
					success,
					message: "Copied successfully!",
					variant: "success",
				})
			}
			return this.toast({
				success,
				message: "Could not copy to clipboard",
				variant: "error",
			})
		}
		const url = this.urls[value];
		return window.open(url, "_blank");
	}

	toast(detail){
		this.dispatchEvent(new CustomEvent('toast', {
			bubbles: true,
			composed: true,
			detail,
		}))
	}

	copyTextToClipboard(text) {
	
		return new Promise((res, rej) => navigator.clipboard.writeText(text).then(
			() => res(true),
			() => {
				const success = this.fallbackCopyTextToClipboard(text);
				if(success) {
					return res(false);
				}
				return rej(false);
			})
		);
	}

	fallbackCopyTextToClipboard(text) {
		const textArea = document.createElement("textarea");
		textArea.value = text;

		// Avoid scrolling to bottom
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand("copy");
			
			document.body.removeChild(textArea);
			if (successful) {
				return true
			} 
			return false
		} catch (error) {
			return false
		}
	}
}
