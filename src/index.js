import '@lwc/synthetic-shadow'; // lightning-base-components needs synthetic shadow DOM

import { createElement } from 'lwc';
import MainApp from 'main/app';

const app = createElement('main-app', { is: MainApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);