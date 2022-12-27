//import '@lwc/synthetic-shadow'; //https://salesforce.stackexchange.com/questions/269615/lightning-web-components-open-source-with-lightning-design-system-lwc-with-slds

import { createElement } from 'lwc';
import MainApp from 'main/app';

const app = createElement('main-app', { is: MainApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);