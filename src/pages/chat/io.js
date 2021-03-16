import io from 'socket.io-client'
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCookie } from '../../utils/cookie.js'
import { useI18n } from 'vue-i18n'
import Constants from './constants'
import { Modal } from 'ant-design-vue'

export const useIo = (url, { $message, spinning }) => {
    const router = useRouter()
    const store = useStore()
    const { t } = useI18n()

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
        console.log('join')
        store.commit('ADD_USER', user)
        // $message.info(`${user.user_name}进入了房间`);
        $message.info(t('message.chat.M003', { name: user.user_name }))
    })

    //其它用户离开房间
    socket.on(Constants.EVENT_TYPE.LEAVE, ({ room_info, leave_user_name }) => {
        console.log('leave')
        store.dispatch('otherUserQuitRoom', room_info)
        $message.warning(t('message.chat.M004', { name: leave_user_name }))
    })
    //断开连接
    socket.on(Constants.EVENT_TYPE.DISCONNECT, (reason) => {
        //服务器断开后,前台需要对应返回之前页
        if (reason !== 'io client disconnect') {
            connect_error(
                spinning,
                store,
                router,
                socket,
                t,
                Constants.EVENT_TYPE.DISCONNECT,
                reason
            )
            console.log('disconnect')
        }
    })
    // 连接错误-仅仅是连接时候的错误
    socket.on(Constants.EVENT_TYPE.ERROR, (error) => {
        connect_error(
            spinning,
            store,
            router,
            socket,
            t,
            Constants.EVENT_TYPE.ERROR,
            error
        )
        console.log('连接失败', error)
    })

    //token过期
    socket.on(Constants.EVENT_TYPE.TOKEN_EXPORED, (error) => {
        onnect_error(
            spinning,
            store,
            router,
            socket,
            t,
            Constants.EVENT_TYPE.TOKEN_EXPORED,
            error
        )
        console.log('tokenExpired', error)
    })

    return socket
}

const connect_error = (spinning, store, router, socket, t, event, error) => {
    spinning.value = true
    store.dispatch('quitRoom', { t })
    socket.close()
    Modal.error({
        title: t('label.chat.L007'),
        content: h('div', {}, [
            t('message.chat.M006'),
            h(
                'div',
                { class: 'connect_error' },
                `${event.toUpperCase()}: ${
                    typeof error === 'string' ? error : error.message
                }`
            ),
        ]),
        onOk() {
            router.go(0)
        },
        centered: true,
        okText: t('label.global.L003'),
    })
}
