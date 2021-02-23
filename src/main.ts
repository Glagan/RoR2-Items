import { createApp } from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import Unicon from 'vue-unicons';
import { uniGithub, uniCheckCircle, uniSearchAlt } from 'vue-unicons/icons';
import './index.css';

Unicon.add([uniGithub, uniCheckCircle, uniSearchAlt]);

createApp(App).use(Unicon).use(Vuex).mount('#app');
