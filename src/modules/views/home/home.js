import { LightningElement } from 'lwc';

import { emoji } from './../../utils/emoji';

export default class Home extends LightningElement {
	get eHome() {
		return emoji('home');
	}
	get eSolution() {
		return emoji('solution');
	}
	get eComponent() {
		return emoji('component');
	}
	get eDeploy() {
		return emoji('deploy');
	}
}
