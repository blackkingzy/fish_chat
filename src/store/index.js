import { reactive } from 'vue'

//用户信息
const getDefaultUserInfo = () => {
    return {
        userName: '',
    }
}

let userInfo = reactive(getDefaultUserInfo())

const useSetUserInfo = (info) => {
    userInfo.userName = info.userName;
}


const useClearUserInfo = () => {
    Object.assign(userInfo, getDefaultUserInfo())
}


//房间信息
const getDefaultRoomInfo = () => {
    return {
        roomNo: '',
        onlineCount: '',
        userList: []
    }
}

let roomInfo = reactive(getDefaultRoomInfo())

const useSetRoomInfo = (info) => {
    roomInfo.roomNo = info.roomNo
    roomInfo.onlineCount = info.onlineCount
    roomInfo.userList = info.userList
}

const useClearRoomInfo = () => {
    Object.assign(roomInfo, getDefaultRoomInfo())
}

const quitRoom = () => {
    useClearUserInfo()
    useClearRoomInfo()
}

export {
    userInfo,
    roomInfo,
    useSetUserInfo,
    useClearUserInfo,
    useSetRoomInfo,
    useClearRoomInfo,
    quitRoom
}