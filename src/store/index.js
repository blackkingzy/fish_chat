import Vuex from 'vuex'
import { removeCookie, setCookie } from '../utils/cookie'
import { message } from 'ant-design-vue'

const getGlobalInfo = () => {
    return {
        domain: document.domain,
        port: window.location.port
    }
}

//用户信息
const getDefaultUserInfo = () => {
    return {
        user_id: '',
        user_name: '',
        user_avatar: '../../../assets/logo.png',
    }
}

const getDefaultRoomInfo = () => {
    return {
        room_No: '',
        room_password: '',
        users: [],
        user_count: 0,
        chat_history: [],
    }
}

const getDefaultState = () => {
    return {
        user_info: getDefaultUserInfo(),
        room_info: getDefaultRoomInfo(),
    }
}

export default Vuex.createStore({
    state: {
        global: getGlobalInfo(),
        user_info: getDefaultUserInfo(),
        room_info: getDefaultRoomInfo(),
    },
    getters: {
        domain: (state) => state.global.domain,
        port: (state) => state.global.port,
        user_id: (state) => state.user_info.user_id,
        user_info: (state) => state.user_info,
        room_No: (state) => state.room_info.room_No,
        room_info: (state) => state.room_info,
        chat_history: (state) => state.room_info.chat_history,
    },

    mutations: {
        RESET_STATE: (state) => {
            Object.assign(state, getDefaultState())
        },
        SET_ROOM_NO: (state, room_No) => {
            state.room_info.room_No = room_No
        },
        SET_ROOM_PASSWORD: (state, room_password) => {
            state.room_info.room_password = room_password
        },
        SET_USERS: (state, users) => {
            state.room_info.users = users
        },
        SET_USER_COUNT: (state, user_count) => {
            state.room_info.user_count = user_count
        },
        SET_USER_ID: (state, user_id) => {
            state.user_info.user_id = user_id
        },
        SET_USER_NAME: (state, user_name) => {
            state.user_info.user_name = user_name
        },
        ADD_USER: (state, user) => {
            state.room_info.users.push(user)
            state.room_info.user_count += 1
        },
        SET_HISTORY: (state, history) => {
            state.room_info.chat_history = history
        },
        ADD_MSG: (state, msg) => {
            state.room_info.chat_history.push(msg)
        },
    },
    actions: {
        successEnter: ({ commit }, { user_info, room_info, room_No }) => {
            commit('SET_ROOM_NO', room_No)
            commit('SET_ROOM_PASSWORD', room_info.room_password)
            commit('SET_USERS', room_info.users)
            commit('SET_USER_COUNT', room_info.user_count)
            commit('SET_USER_ID', user_info.user_id)
            commit('SET_USER_NAME', user_info.user_name)
            commit('SET_HISTORY', room_info.chat_history)
            setCookie('room_no', room_No)
        },
        otherUserQuitRoom: ({ state, commit }, room_info) => {
            commit('SET_USERS', room_info.users)
            commit('SET_USER_COUNT', room_info.user_count)
        },
        quitRoom: ({ state, commit }, { t }) => {
            message.info(
                t('message.chat.M005', { room_No: state.room_info.room_No })
            )
            // message.info(`Exited room ${state.room_info.room_No}`);
            commit('RESET_STATE')
            removeCookie('token')
            removeCookie('room_no')
            removeCookie('io')
        },
    },
})
