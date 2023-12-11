import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal';

import { useAuthStore } from './stores/authStore';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createVfm());

useAuthStore().init();

app.mount('#app');
