<template>
    <a-spin
        :spinning="spinning"
        tip="正在进入房间..."
        size="large"
        wrapperClassName="chat_spin"
    >
        <div class="chat_window">
            <div class="chat_title">
                <div class="number">
                    <img src="../../assets/room_No.png" />
                    <span>{{ store.getters.room_info.room_No }}</span>
                </div>
                <div class="count">
                    <img src="../../assets/user_count.png" />
                    <span>{{ store.getters.room_info.user_count }}</span>
                </div>
            </div>
            <div class="chat_body">
                <chat-slide></chat-slide>
                <div class="chat_main">
                    <chat-content :msgList="messageList"></chat-content>
                    <div class="chat_main_input">
                        <z-text-area
                            v-model="msgValue"
                            @enter="sendMessage"
                        ></z-text-area>
                        <z-button @click="sendMessage" type="main">
                            send
                        </z-button>
                    </div>
                </div>
            </div>
            <div class="leave_button">
                <a-button type="danger" @click="leaveRoom">
                    leave Room
                </a-button>
            </div>
        </div>
    </a-spin>
</template>

<script>
import { getCurrentInstance } from 'vue'
import io from 'socket.io-client'
import ChatContent from './components/ChatContent.vue'
import ZTextArea from './components/ZTextArea.vue'
import ZButton from '../../components/ZButton.vue'
import ChatSlide from './components/ChatSlide.vue'
import LeaveRoom from './components/LeaveRoom.vue'
import { reactive, ref, watchEffect } from 'vue'
import { isEmpty } from '../../utils/index.js'
import { get, post } from '../../utils/http'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { create } from '../../utils/create'
import { router } from '../../router/index.js'
import { removeToken } from '../../utils/auth.js'
import { useIo } from './io.js'
import { useStore } from 'vuex'

export default {
    components: {
        ZTextArea,
        ChatContent,
        ZButton,
        ChatSlide,
    },
    setup(props, content) {
        //getCurrentInstancez这个方法在务必要在setup中调用,在其内部的方法中调用无效
        const {
            $message,
        } = getCurrentInstance().appContext.config.globalProperties

        const spinning = ref(true)
        const store = useStore()

        const msgValue = ref('')
        const messageList = reactive([
            {
                user_id: '123456',
                user_name: 'zhangsan',
                message_content:
                    'n9999999999999999999999999999999999999999999999999999999999999999999999999999',
            },
            {
                user_id: '123954',
                user_name: 'zhangyue',
                message_content:
                    '66666666666666666666666666666666666666666666666666666666666666666666666666666',
            },
        ])
        // watchEffect(() => {
        //     console.log(msgValue.value);
        // });
        const socket = useIo('localhost:3010', {
            $message,
            spinning,
            messageList,
        })
        onBeforeRouteLeave((to, from, next) => {
            console.log('我要离开该房间')
            store.dispatch('quitRoom')
            removeToken()
            socket.close()
            next()
        })
        function sendMessage() {
            if (isEmpty(msgValue.value)) {
                console.log('qin bu yao shu ru kong neirong')
                return
            }
            console.log(msgValue.value)
            const msg = {
                user_id: store.getters.user_info.user_id,
                user_name: store.getters.user_info.user_name,
                message_content: msgValue.value,
            }
            messageList.push(msg)
            socket.emit('send', msg)
            msgValue.value = ''
        }

        function leaveRoom() {
            console.log('wo yao likai')
            create(LeaveRoom, {
                visible: true,
            })
        }

        return {
            store,
            sendMessage,
            messageList,
            msgValue,
            spinning,
            leaveRoom,
        }
    },
}
</script>

<style lang="css" scoped>
.chat_window {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.chat_body {
    margin: auto;
    width: 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    border-top: 1px solid #ebeef5;
}
.chat_title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    height: 2rem;
    line-height: 2rem;
}
.chat_title div:first-child {
    margin-right: 1rem;
}
.chat_title img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
}
.chat_title span {
    margin-right: 0.5rem;
    vertical-align: text-top;
}
.chat_slide {
    border-right: 1px solid #ebeef5;
}
.chat_main {
    height: 500px;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 7fr 1fr;
}
.chat_main_input {
    display: grid;
    grid-template-columns: 6fr 1fr;
}
.chat_main_input >>> button {
    width: 100%;
    height: 100%;
    border: none;
}
.chat_spin >>> .ant-spin-blur {
    opacity: 0;
}
.leave_button {
    position: fixed;
    top: 2rem;
    right: 2rem;
}
</style>
