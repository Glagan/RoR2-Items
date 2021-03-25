import { createApp } from 'vue';
import LazyLoadDirective from './directives/LazyLoadDirective';
import App from './App.vue';
import Unicon from 'vue-unicons';
import {
	uniGithub,
	uniCheckCircle,
	uniTimes,
	uniUnlock,
	uniExternalLinkAlt,
	uniInfoCircle,
	uniTimesCircle,
} from 'vue-unicons/icons';
import { steam } from './icons/steam';
import './index.css';

Unicon.add([uniGithub, uniCheckCircle, uniTimes, uniUnlock, uniExternalLinkAlt, uniInfoCircle, uniTimesCircle, steam]);

createApp(App).directive('lazyload', LazyLoadDirective).use(Unicon).mount('#app');
