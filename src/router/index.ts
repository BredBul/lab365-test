import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/home/HomePage.vue'
import PersonPage from '@/pages/person/PersonPage.vue'
import PeoplePage from '@/pages/people/PeoplePage.vue'
import FavoritesPage from '@/pages/favorites/FavoritesPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/people',
    name: 'people',
    component: PeoplePage,
  },
  {
    path: '/people/:id',
    name: 'person',
    component: PersonPage,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;