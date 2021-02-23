import { createApp } from 'vue';
import App from './App.vue';
import Unicon from 'vue-unicons';
import { uniGithub, uniCheckCircle, uniSearchAlt, uniTimes, uniUnlock } from 'vue-unicons/icons';
import './index.css';

Unicon.add([uniGithub, uniCheckCircle, uniSearchAlt, uniTimes, uniUnlock]);

createApp(App).use(Unicon).mount('#app');
