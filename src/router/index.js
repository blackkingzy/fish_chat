import { createRouter, createWebHistory } from 'vue-router'

import enter from '../pages/enter/index.vue'
import chat from '../pages/chat/index.vue'


const routes = [
    { path: '/', component: enter },
    { path: '/chat', component: chat }
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes // short for `routes: routes`
})
export {
    router
}