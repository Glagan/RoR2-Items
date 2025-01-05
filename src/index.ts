import { createApp } from 'vue';
import LazyLoadDirective from './directives/LazyLoadDirective';
import App from './App.vue';
import './index.css';

const app = createApp(App).directive('lazyload', LazyLoadDirective);
app.mount('#app');
