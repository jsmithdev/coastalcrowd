import { LightningElement } from "lwc";

import { getItemsByType } from "./../../db/db.js";

export default class Solutions extends LightningElement {
  items = [];

  async connectedCallback() {
    this.items = await this.getItems();
  }

  getItems() {
    return getItemsByType("solution");
  }
}
