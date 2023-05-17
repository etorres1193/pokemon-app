import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import PokemonView from '../views/PokemonView.vue';
import PokemonDetailView from '@/views/PokemonDetailView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'Pokemon',
        component: PokemonView,
    },
    {
        path: '/pokemon/detail',
        name: 'PokemonDetail',
        component: PokemonDetailView
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
