import { createApp } from 'vue';
import App from './App.vue';
import Unicon from 'vue-unicons';
import {
	uniGithub,
	uniCheckCircle,
	uniSearchAlt,
	uniTimes,
	uniUnlock,
	uniExternalLinkAlt,
	uniBars,
} from 'vue-unicons/icons';
import { steam } from './icons/steam';
import './index.css';

Unicon.add([uniGithub, uniCheckCircle, uniSearchAlt, uniTimes, uniUnlock, uniExternalLinkAlt, uniBars, steam]);

createApp(App).use(Unicon).mount('#app');
