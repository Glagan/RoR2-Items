import * as Sentry from '@sentry/vue';
import { createApp } from 'vue';
import LazyLoadDirective from './directives/LazyLoadDirective';
import App from './App.vue';
import './index.css';

const app = createApp(App).directive('lazyload', LazyLoadDirective);
const dsn = import.meta.env.VITE_SENTRY_DSN;

if (dsn) {
	Sentry.init({
		app,
		dsn,
		environment: import.meta.env.MODE,
		release: import.meta.env.VITE_SENTRY_RELEASE,
		integrations: [
			Sentry.browserTracingIntegration(),
			Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
		],
		tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
		replaysSessionSampleRate: 0,
		replaysOnErrorSampleRate: 1.0,
		// This static app has no backend that needs tracing headers.
		tracePropagationTargets: [],
	});
}

app.mount('#app');
