import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/auth.js'
import { get_special } from '../utils/http.js'
import store from '../store/index.js'
import { message } from 'ant-design-vue';
import { removeToken } from "../utils/auth"

import enter from '../pages/enter/index.vue'
import chat from '../pages/chat/index.vue'

const routes = [
    { path: '/', component: enter },
    { path: '/chat', component: chat },
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach(async (to, from, next) => {
    //获取token,没有token直接到首页
    //有token,判断是不是刷新，如果是刷新，请求接口去获取用户信息等等
    if (getToken()) {
        //关闭页面重新进入
        if (to.path === '/') {
            next({ path: '/chat' })
        } else if (store.getters.room_No) {
            //判断是不是刷新
            next()
        } else {
            try {
                //请求重新进入房间的接口
                const data = await get_special('api/info')
                console.log('api/info', data)
                const params = {
                    user_info: data.user_info,
                    room_No: data.room_No,
                    room_info: data.room_info,
                }
                store.dispatch('successEnter', params)
                next()
            } catch (error) {
                removeToken()
                //根据具体错误做出提示
                message.error(error.message);
                next({ path: '/' })
            }
        }
    } else {
        if (to.path === '/') {
            next()
        } else {
            next({ path: '/' })
        }
    }
})

export { router }
