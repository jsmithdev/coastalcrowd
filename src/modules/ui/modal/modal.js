import { api, track, LightningElement } from "lwc";

export default class Modal extends LightningElement {
  @api header;
  @api trigger;
  @api value;
  /**
   * @description {String} small | medium | large
   */
  @api variant;

  @track loading;
  @track active;
  @track data = [];

  is = "modal";

  show() {
    console.log("show");
    this.loading = true;
    this.active = true;

    this.loading = false;
  }

  get modalClassList() {
    if (this.variant === "large") {
      return "slds-modal slds-fade-in-open slds-modal_large";
    } else if (this.variant === "small") {
      return "slds-modal slds-fade-in-open slds-modal_small";
    }

    return "slds-modal slds-fade-in-open slds-modal_medium";
    /* 
        if(this.variant === 'large'){
            return 'slds-modal slds-fade-in-open slds-modal_large'
        }
        else if(this.variant === 'small')      {
            return 'slds-modal slds-fade-in-open slds-modal_small'
        }

        return 'slds-modal slds-fade-in-open slds-modal_medium' */
  }

  close(event) {
    if(event.target.classList.contains('close')
    || event.target.classList.contains('modal__content')
    || event.target.tagName === 'UI-CARD') {
      this.active = false;
      this.dispatch("close");
    }
  }

  /**
   * dispatch a (bubbles & composed true) CustomEvent
   * @param {String} name name of event
   * @param {Object} detail object to send
   */
  dispatch(name, detail = {}) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail,
      })
    );
  }
}
