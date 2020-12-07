import io from 'socket.io-client'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCookie } from '../../utils/cookie.js'
import { useI18n } from 'vue-i18n'
import Constants from './constants'

export const useIo = (url, { $message, spinning }) => {
    const router = useRouter()
    const store = useStore()
    const { t } = useI18n()
    console.log(getCookie('io'))
    //建立连接
    const socket = io(url, {
        reconnectionDelayMax: 30000,
        query: {
            room_No: store.getters.room_No,
            token: getCookie('token'),
        },
    })

    //监听连接
    socket.on(Constants.EVENT_TYPE.CONNECT, () => {
        spinning.value = false
        console.log(socket.connected) // true
    })

    //接受消息
    socket.on(Constants.EVENT_TYPE.ACCEPT, (msg) => {
        console.log('accept')
        store.commit('ADD_MSG', msg)
    })

    //新用户进入房间
    socket.on(Constants.EVENT_TYPE.JOIN, (user) => {
        console.log('join', user)
        store.commit('ADD_USER', user)
        // $message.info(`${user.user_name}进入了房间`);
        $message.info(t('message.chat.M003', { name: user.user_name }))
    })

    //其它用户离开房间
    socket.on(Constants.EVENT_TYPE.LEAVE, ({ room_info, leave_user_name }) => {
        console.log('leave', room_info)
        store.dispatch('otherUserQuitRoom', room_info)
        $message.warning(t('message.chat.M004', { name: leave_user_name }))
    })
    //断开连接
    socket.on(Constants.EVENT_TYPE.DISCONNECT, (reason) => {
        //服务器断开后,前台需要对应返回之前页
        if (reason !== 'io client disconnect') {
            router.push({ path: '/' })
            $message.error(reason)
            console.log('disconnect')
        }
    })
    // 连接错误-仅仅是连接时候的错误
    socket.on(Constants.EVENT_TYPE.ERROR, (error) => {
        console.log('连接失败')
        //连接错误,回到首页
        router.push({ path: '/' })
        $message.error(error.message)
        console.log('error', error)
    })

    //token过期
    socket.on(Constants.EVENT_TYPE.TOKEN_EXPORED, (error) => {
        console.log('tokenExpired')
        router.push({ path: '/' })
        $message.error(error.message)
        console.log('error', error)
    })

    return socket
}
