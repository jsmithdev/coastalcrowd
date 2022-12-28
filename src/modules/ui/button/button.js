/* eslint-disable @lwc/lwc/no-api-reassignments */
import { api, LightningElement } from "lwc";

export default class Button extends LightningElement {
  @api label = "";
  @api className = "";
}
