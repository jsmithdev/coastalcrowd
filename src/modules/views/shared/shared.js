import { LightningElement } from "lwc";

import { getItems } from "./../../db/db.js";

export default class Components extends LightningElement {
  items = [];

  async connectedCallback() {
    this.items = await getItems('shared');
  }
}
