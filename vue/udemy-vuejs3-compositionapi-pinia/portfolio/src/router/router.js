import { createWebHistory, createRouter } from "vue-router";
import TitlePage from '../components/TitlePage.vue';
import About from '../components/About.vue';
import Portfolio from '../components/Portfolio.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TitlePage },
    { path: '/about', component: About },
    { path: '/portfolio', component: Portfolio },
  ]
})

export default router;