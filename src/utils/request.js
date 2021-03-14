import axios from 'axios'
import store from '../store/index.js'
import { router } from '../router/index.js'
import { getCookie, removeCookie } from './cookie'
import { message } from 'ant-design-vue'

// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    baseURL: '',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        if (getCookie('token')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers.Authorization = getCookie('token')
        }
        return config
    },
    (error) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const res = response.data
        console.log(res)

        // if the custom code is not 200, it is judged as an error.
        if (res.code !== 200) {
            // 423: Token expired;
            if (res.code === 423) {
                // to path:/
                // const isRefresh = store.getters.room_No
                // 切记，如果是刷新，只需要清空token，其它值因为刷新自然就清空了
                getCookie('token') ? removeCookie('token') : ''
                message.error(res.error)
                router.push({ path: '/' })
            }
            return Promise.reject(new Error(res.error || 'Error'))
        } else {
            return res
        }
    },
    (error) => {
        //非自定义的错误码在这里
        console.log(error.response)
        const { status } = error.response
        const { url } = error.response.config
        console.log(url)
        ;['api/isOpenService', 'api/info'].includes(url)
            ? ''
            : errorCallback(status)
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000,
        // })
        //其实这方法只要你不抛错或者return一个状态是失败的promise,它就只会被then捕获
        return Promise.reject(error)
    }
)

export const errorCallback = (status, next) => {
    if (503 === status) {
        //服务器崩溃
        getCookie('token') ? removeCookie('token') : ''
        next
            ? next({ path: `/${status}` })
            : router.push({ path: `/${status}` })
    } else if (404 === status) {
        router.push({ path: '/404' })
    }
}

export default service
