import Vuex from 'vuex'
import { removeToken } from '../utils/auth'

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
        users: [],
        user_count: 0,
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
        user_info: getDefaultUserInfo(),
        room_info: getDefaultRoomInfo(),
    },
    getters: {
        user_id: (state) => state.user_info.user_id,
        user_info: (state) => state.user_info,
        room_No: (state) => state.room_info.room_No,
        room_info: (state) => state.room_info,
    },

    mutations: {
        RESET_STATE: (state) => {
            Object.assign(state, getDefaultState())
        },
        SET_ROOM_NO: (state, room_No) => {
            state.room_info.room_No = room_No
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
        },
        REDUCE_USER: (state, index) => {
            state.room_info.users.splice(i, index)
        },
        TEST: () => {
            console.log('vuex test')
        },
    },
    actions: {
        successEnter: ({ commit }, { user_info, room_info, room_No }) => {
            commit('SET_ROOM_NO', room_No)
            commit('SET_USERS', room_info.users)
            commit('SET_USER_COUNT', room_info.user_count)
            commit('SET_USER_ID', user_info.user_id)
            commit('SET_USER_NAME', user_info.user_name)
        },
        otherUserQuitRoom: ({ state, commit }, user) => {
            for (let i = 0; i < state.room_info.users.length; i++) {
                if (state.room_info.users[i].user_id === user.user_id) {
                    commit('REDUCE_USER', i)
                }
            }
        },
        quitRoom: ({ commit }) => {
            commit('RESET_STATE')
            removeToken()
        },
    },
})
