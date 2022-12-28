/* eslint-disable no-restricted-globals */
/* eslint-disable @lwc/lwc/no-api-reassignments */
import { api, LightningElement } from "lwc";

export default class Actions extends LightningElement {
  @api name = "";
  @api author = "";

  action = "";
  success = false;
  port = location.hostname === "localhost" ? `:${location.port}` : "";
  host = `${location.protocol}//${location.hostname}${this.port}`;

  buttonClass = "";

  get action_label() {
    const record = this.action
      ? this.actions.find((action) => action.value === this.action)
      : this.actions[0];

    const { label, button, button_success } = record;
    const value =
      this.success && button_success ? button_success : button || label;
    const end = value.indexOf(" ") === -1 ? value.length : value.indexOf(" ");
    return value.substring(0, end);
  }

  get actions() {
    return [
      {
        label: "Share",
        button: "Copy",
        button_success: "Copied!",
        value: "share",
      },
      {
        label: "Deploy to Sandbox",
        value: "deploy_sandbox",
      },
      {
        label: "Deploy to Dev/Prod",
        value: "deploy_production",
      },
      {
        label: "Open Project",
        value: "open_repo",
      },
    ];
  }

  get urls() {
    return {
      share: `${this.host}?share=${encodeURIComponent(
        `${this.author}/${this.name}`
      )}`,
      deploy_production: `https://githubsfdeploy.herokuapp.com/app/githubdeploy/${this.author}/${this.name} `,
      deploy_sandbox: `https://githubsfdeploy-sandbox.herokuapp.com/app/githubdeploy/${this.author}/${this.name} `,
      open_repo: `https://github.com/${this.author}/${this.name} `,
    };
  }

  handleSelect(event) {
    const { value } = event.target;

    this.action = value;
  }

  runAction() {
    if (!this.action) {
      const { value } = this.actions[0];
      this.action = value;
    }

    if (this.action === "share") {
      const url = this.urls[this.action];
      return this.copyTextToClipboard(url);
    }
    const url = this.urls[this.action];
    return window.open(url, "_blank");
  }

  copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      return this.fallbackCopyTextToClipboard(text);
    }

    navigator.clipboard.writeText(text).then(
      () => {
        this.copySuccess();
      },
      function (error) {
        console.error("Async: Could not copy text: ", error);
        return this.fallbackCopyTextToClipboard(text);
      }
    );
    return undefined;
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
      if (successful) {
        this.copySuccess();
      } else {
        return console.error("Fallback: Unable to copy: ", successful);
      }
    } catch (error) {
      return console.error("Fallback: Oops, unable to copy", error);
    }

    return document.body.removeChild(textArea);
  }
  toggleSuccess() {
    const clear = () => {
      this.success = false;
      this.buttonClass = "";
    };

    this.success = true;
    this.buttonClass = "success";

    setTimeout(clear, 4000);
  }
  copySuccess() {
    this.toggleSuccess();
    setTimeout(this.toggleSuccess, 4000);
  }
}
