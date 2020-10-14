<template>
    <div class="chat_window">
        <div class="chat_title">
            <span class="number">房间号：1024</span>
            <span class="count">在线人数：2</span>
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
                    <z-button @click="sendMessage" type="main"> send </z-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
import ChatContent from "./components/ChatContent.vue";
import ZTextArea from "./components/ZTextArea.vue";
import ZButton from "../../components/ZButton.vue";
import ChatSlide from "./components/ChatSlide.vue";
import { userInfo } from "../../store/index.js";
import { reactive, ref, watchEffect } from "vue";
import { isEmpty } from "../../utils/index.js";
export default {
    components: {
        ZTextArea,
        ChatContent,
        ZButton,
        ChatSlide,
    },
    setup() {
        const socket = io("localhost:3010");

        socket.on("send1", (data) => {
            const { name, message_content } = data;
            messageList.push({ name, message_content });
        });

        const msgValue = ref("");
        const messageList = reactive([
            {
                name: "王铮",
                message_content:
                    "n9999999999999999999999999999999999999999999999999999999999999999999999999999",
            },
            {
                name: "zhangyue",
                message_content:
                    "66666666666666666666666666666666666666666666666666666666666666666666666666666",
            },
        ]);
        // watchEffect(() => {
        //     console.log(msgValue.value);
        // });
        function sendMessage() {
            if (isEmpty(msgValue.value)) {
                console.log("qin bu yao shu ru kong neirong");
                return;
            }
            console.log(msgValue.value);
            const msg = {
                name: userInfo.userName,
                message_content: msgValue.value,
            };
            messageList.push(msg);
            socket.emit("send", msg);
            msgValue.value = "";
        }
        return { sendMessage, messageList, msgValue };
    },
};
</script>

<style lang="css" scoped>
.chat_body {
    margin: auto;
    width: 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    border: 1px solid blue;
}
.chat_title {
    text-align: center;
    font-weight: 800;
    margin-bottom: 0.5rem;
}
.chat_title .number {
    margin-right: 0.5rem;
}
.chat_slide {
    border: yellow 1px solid;
}
.chat_main {
    border: brown 1px solid;
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
}
</style>