import { LightningElement } from "lwc";

import { getItems } from "./../../db/db.js";

export default class Search extends LightningElement {

	searchTerm = "";
	filtered = [];
  
	get items() {
		return this._items || [];
	}
	set items(value) {
		this._items = value;
		this.filtered = value;
	}

	async connectedCallback() {
		this.items = await getItems();
		this.template.querySelector("lightning-input").focus();
	}

	handleSearchTermChange(event) {
		this.searchTerm = event.target.value;
		this.filterItems();
	}

	filterItems() {
		this.filtered = this.items.filter((item) => {
			return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
			|| item.keywords.toLowerCase().includes(this.searchTerm.toLowerCase())
		});
	}

	handleSearch(event) {
		event.preventDefault();
		this.filterItems();
	}
}
