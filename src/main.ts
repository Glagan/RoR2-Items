import { createApp } from 'vue';
import App from './App.vue';
import Unicon from 'vue-unicons';
import { uniGithub, uniCheckCircle, uniTimes, uniUnlock, uniExternalLinkAlt, uniInfoCircle } from 'vue-unicons/icons';
import { steam } from './icons/steam';
import './index.css';

Unicon.add([uniGithub, uniCheckCircle, uniTimes, uniUnlock, uniExternalLinkAlt, uniInfoCircle, steam]);

createApp(App).use(Unicon).mount('#app');
