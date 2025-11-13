import './assets/main.css'

import axios from 'axios';

import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import LoginView from './pages/LoginView.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import App from './App.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const pinia = createPinia()

const app = createApp(App)
  .use(router)
  .use(pinia);

const api = axios.create({
  baseURL: '/api', // Proxy en desarrollo
});
// Configuración global de Axios
app.config.globalProperties.$axios = api;

// Register global components
app.component('QuillEditor', QuillEditor);

app.mount('#app');
