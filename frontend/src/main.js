import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss';
import App from './App.vue';
import router from './router.js';

createApp(App).use(router).mount('#app');

// Register the service worker (PWA)
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/service-worker.js');
