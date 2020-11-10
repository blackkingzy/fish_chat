import io from "socket.io-client";
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { getToken } from "../../utils/auth.js"

export const useIo = (url, { $message, spinning, messageList }) => {
    const router = useRouter()
    const store = useStore()
    //建立连接
    const socket = io(url, {
        reconnectionDelayMax: 10000,
        query: {
            user_id: store.getters.user_id,
            room_No: store.getters.room_No,
            token: getToken()
        },
    });

    //监听连接
    socket.on("connect", () => {
        spinning.value = false;
        console.log(socket.connected); // true
    });

    //接受消息
    socket.on("accept", (msg) => {
        messageList.push({ ...msg });
    });

    //新用户进入房间
    socket.on("join", (user) => {
        console.log("join", user);
        store.commit('ADD_USER', user)
        $message.info(`${user.user_name}进入了房间`);
    });

    //其它用户离开房间
    socket.on("leave", (user) => {
        console.log("leave", user);
        store.commit('REDUCE_USER', user)
        // const user = otherUserQuitRoom(user);
        $message.warning(`${user.user_name}离开了房间`);
    });
    socket.on("disconnect", (reason) => {
        console.log("reason", reason);
        console.log("disconnect");
    });
    // 连接错误-仅仅是连接时候的错误
    socket.on("error", (error) => {
        //连接错误,回到首页
        router.push({ path: "/" });
        $message.error(error.message);
        console.log("error", error);
    });

    //token过期
    socket.on("tokenExpired", (error) => {
        console.log('tokenExpired');
        router.push({ path: "/" });
        $message.error(error.message);
        console.log("error", error);
    });

    return socket
}