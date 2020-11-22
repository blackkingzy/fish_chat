import axios from 'axios'
import store from '../store/index.js'
import { router } from '../router/index.js'
import { getCookie, removeCookie } from './cookie'

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
            // if (res.code === 423) {
            //     // to path:/
            //     // const isRefresh = store.getters.room_No
            //     // 切记，如果是刷新，只需要清空token，其它值因为刷新自然就清空了
            //     removeCookie('token')
            // }
            return Promise.reject(new Error(res.error || 'Error'))
        } else {
            return res
        }
    },
    (error) => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        })
        return Promise.reject(error)
    }
)

export default service
