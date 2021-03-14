import { createRouter, createWebHistory } from 'vue-router'
import { get } from '../utils/http.js'
import store from '../store/index.js'
import { message } from 'ant-design-vue'
import { removeCookie, getCookie } from '../utils/cookie'

import enter from '../pages/enter/index.vue'
import chat from '../pages/chat/index.vue'
import error_404 from '../pages/error/404.vue'
import error_503 from '../pages/error/503.vue'
import { errorCallback } from '../utils/request.js'

//笔记：注意:path '/'直接redirect 到'/enter',该beforeEach方法直接略过了匹配path '/',这应该是vue-router的规则
const routes = [
    // {
    //     path: '/',
    //     component: layout,
    //     redirect: '/enter',
    //     children: [
    //         {
    //             path: 'enter',
    //             component: enter,
    //         },
    //         {
    //             path: 'chat',
    //             component: chat,
    //         },
    //         {
    //             path: '404',
    //             component: error_404,
    //         },
    //         {
    //             path: '/:error',
    //             redirect: '/404',
    //         },
    //     ],
    // },
    {
        path: '/',
        component: enter,
    },
    {
        path: '/chat',
        component: chat,
    },
    {
        path: '/404',
        component: error_404,
    },
    {
        path: '/503',
        component: error_503,
    },
    {
        path: '/:error', //可以改成*
        redirect: '/404',
    },
    // 404 page must be placed at the end !!!
    // { path: '/404', component: error },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const whiteList = ['/']

router.beforeEach(async (to, from, next) => {
    //注意:path '/'直接redirect 到'/enter',该beforeEach方法直接略过了匹配path '/',这应该是vue-router的规则
    console.log(to, from)

    //获取token,没有token直接到首页
    //有token,判断是不是刷新，如果是刷新，请求接口去获取用户信息等等
    if (getCookie('token')) {
        //关闭页面重新进入
        if (whiteList.indexOf(to.path) !== -1) {
            next({ path: '/chat' })
        } else if (to.path === '/404' || to.path === '/503') {
            next()
        } else if (store.getters.room_No) {
            //判断是不是刷新
            next()
        } else {
            try {
                //请求重新进入房间的接口
                const data = await get('api/info')
                console.log('api/info', data)
                const params = {
                    user_info: data.user_info,
                    room_No: data.room_No,
                    room_info: data.room_info,
                }
                store.dispatch('successEnter', params)
                next()
            } catch (error) {
                //根据具体错误做出提示
                const { status } = error.response
                errorCallback(status, next)
                message.error(error.message)
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1 && from.path !== '/chat') {
            try {
                await get('api/isOpenService')
                return next()
            } catch (error) {
                const { status } = error.response
                return errorCallback(status, next)
            }
        } else if (to.path === '/chat') {
            // next(`/?redirect=${to.path}`)
            return next({ path: '/' })
        }
        next()
    }
})

export { router }
