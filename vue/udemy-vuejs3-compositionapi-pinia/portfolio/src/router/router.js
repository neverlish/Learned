import { createWebHistory, createRouter } from "vue-router";
import TitlePage from '../components/TitlePage.vue';
import About from '../components/About.vue';
import Portfolio from '../components/Portfolio.vue';
import Detail from '../components/Detail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TitlePage },
    { path: '/about', component: About },
    { path: '/portfolio', component: Portfolio },
    { path: '/detail/:id', component: Detail },
  ]
})

export default router;