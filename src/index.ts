import { createApp } from 'vue';
import LazyLoadDirective from './directives/LazyLoadDirective';
import App from './App.vue';
import './index.css';
import * as Sentry from '@sentry/vue';

const app = createApp(App).directive('lazyload', LazyLoadDirective);

Sentry.init({
	app,
	dsn: 'https://0949f913e2cf4b8e99365cf1e993c896@glitchtip.nikurasu.org/3',
});

app.mount('#app');
