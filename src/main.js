import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';

const routes = [
  { 
    path: '/', 
    component: () => import('./views/BirthdayForm.vue') 
  },
  { 
    path: '/story', 
    component: () => import('./views/StoryReader.vue') 
  },
  {
    path: '/character',
    component: () => import('./views/CharacterOverview.vue')
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');