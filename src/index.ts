import { createApp } from 'vue';
import LazyLoadDirective from './directives/LazyLoadDirective';
import App from './App.vue';
import './index.css';

createApp(App).directive('lazyload', LazyLoadDirective).mount('#app');
