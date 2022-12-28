import { LightningElement } from "lwc";

import { getItemsByType } from "./../../db/db.js";

export default class Components extends LightningElement {
  items = [];

  async connectedCallback() {
    this.items = await this.getItems();
  }

  getItems() {
    return getItemsByType("development");
  }
}
