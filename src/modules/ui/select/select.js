/* eslint-disable @lwc/lwc/no-api-reassignments */
import { api, LightningElement } from "lwc";

export default class Select extends LightningElement {
  @api label = "";
  @api value = "";

  @api
  get options() {
    return this.data;
  }
  set options(options) {
    this.data = options.map((option) => {
      const o = Object.assign({}, option);
      o.key = String("_k" + Math.random()).replace(".", "");
      return o;
    });
  }

  change(event) {
    this.value = event.target.value;

    this.dispatchEvent(new CustomEvent("change"));
  }
}
