<template>
    <layout wrapperClass="chat">
        <a-spin
            :spinning="spinning"
            :tip="t('message.chat.M002')"
            size="large"
            wrapperClassName="chat_spin"
        >
            <div class="chat_window">
                <div class="chat_title">
                    <i
                        class="open_drawer"
                        @click="showDrawer"
                        v-show="!spinning"
                    ></i>
                    <div class="number">
                        <span> {{ `${t("label.chat.L004")}:` }}</span>
                        <span>{{ store.getters.room_info.room_No }}</span>
                    </div>
                    <div class="count">
                        <span> {{ `${t("label.chat.L005")}:` }}</span>
                        <span>{{ store.getters.room_info.user_count }}</span>
                    </div>
                    <i
                        class="leave_icon"
                        @click="leaveRoom"
                        v-show="!spinning"
                    ></i>
                </div>
                <div class="chat_body">
                    <chat-slide></chat-slide>
                    <div class="chat_main">
                        <chat-content
                            :msgList="store.getters.chat_history"
                            itemHeight="80"
                        ></chat-content>
                        <div class="chat_main_bottom">
                            <div class="function_bar">
                                <Emoji @addEmoji="addEmoji"></Emoji>
                            </div>
                            <div class="chat_main_input">
                                <z-text-area
                                    v-model="msgValue"
                                    @enter="sendMessage"
                                ></z-text-area>
                                <z-button @click="sendMessage" type="main">
                                    {{ t("label.chat.L001") }}
                                </z-button>
                            </div>
                        </div>
                    </div>
                </div>
                <drawer v-model:isShow="isShow"></drawer>
            </div>
        </a-spin>
        <div class="leave_button" v-show="!spinning">
            <a-button type="danger" @click="leaveRoom">
                {{ t("label.chat.L002") }}
            </a-button>
        </div>
    </layout>
</template>

<script>
import layout from "../../layout/index.vue";
import { getCurrentInstance } from "vue";
import ChatContent from "./components/ChatContent.vue";
import ZTextArea from "./components/ZTextArea.vue";
import ZButton from "../../components/ZButton.vue";
import ChatSlide from "./components/ChatSlide.vue";
import LeaveRoom from "./components/LeaveRoom.vue";
import Emoji from "./components/Emoji.vue";
import { reactive, ref, watchEffect } from "vue";
import { isEmpty } from "../../utils/index.js";
import { get, post, del } from "../../utils/http";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { create } from "../../utils/create";
import { router } from "../../router/index.js";
import { removeCookie } from "../../utils/cookie.js";
import { useIo } from "./io.js";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Drawer from "./components/Drawer.vue";

export default {
    components: {
        ZTextArea,
        ChatContent,
        ZButton,
        ChatSlide,
        Emoji,
        Drawer,
        layout,
    },
    setup(props, content) {
        //getCurrentInstancez这个方法在务必要在setup中调用,在其内部的方法中调用无效
        const {
            $message,
        } = getCurrentInstance().appContext.config.globalProperties;

        const spinning = ref(true);
        const store = useStore();
        const { t } = useI18n();

        const msgValue = ref("");
        // const messageList = reactive([
        //     {
        //         user_id: '123456',
        //         user_name: 'zhangsan',
        //         message_content:
        //             'n9999999999999999999999999999999999999999999999999999999999999999999999999999',
        //     },
        //     {
        //         user_id: '123954',
        //         user_name: 'zhangyue',
        //         message_content:
        //             '66666666666666666666666666666666666666666666666666666666666666666666666666666',
        //     },
        // ])
        // watchEffect(() => {
        //     console.log(msgValue.value);
        // });
        const socket = useIo(`${store.getters.domain}:3010`, {
            $message,
            spinning,
        });
        //只要离开当前页面就算离开房间
        onBeforeRouteLeave(async (to, from, next) => {
            //router.push({ path: "/404" });在钩子函数中调用router.push会导致该钩子函数持续调用,务必要等一个路由完全结束在调用下一个
            console.log("我要离开该房间");
            await del("api/quit").catch((error) => {
                console.log(error);
            });
            store.dispatch("quitRoom", { t });
            socket.close();
            next();
        });
        function sendMessage() {
            if (isEmpty(msgValue.value)) {
                console.log("qin bu yao shu ru kong neirong");
                return;
            }
            console.log(msgValue.value);
            const msg = {
                user_id: store.getters.user_info.user_id,
                user_name: store.getters.user_info.user_name,
                message_content: msgValue.value,
            };
            store.getters.chat_history.push(msg);
            socket.emit("send", msg);
            msgValue.value = "";
        }

        function leaveRoom() {
            console.log("wo yao likai");
            create(LeaveRoom, {
                visible: true,
            });
        }

        function addEmoji(emoji) {
            msgValue.value += emoji;
        }

        const isShow = ref(false);
        function showDrawer() {
            console.log("1");
            isShow.value = true;
        }

        return {
            store,
            sendMessage,
            msgValue,
            spinning,
            leaveRoom,
            addEmoji,
            t,
            showDrawer,
            isShow,
        };
    },
};
</script>

<style lang="css" scoped>
.chat_window {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255);
}
@media screen and (max-width: 768px) {
    .chat >>> .header,
    .chat >>> .footer {
        display: none;
    }
    .chat >>> .main {
        height: 100%;
        width: 100%;
    }
    .chat_window {
        /* height: 100vh; */
        height: 100%;
        display: grid;
        grid-template-rows: 5% 95%;
        overflow: hidden;
    }
    .chat_slide {
        display: none;
    }
    .chat_main {
        height: 100%;
        grid-template-rows: 75% 25%;
    }
    .chat_spin {
        height: 100%;
    }
    .chat_spin >>> .ant-spin-container {
        height: 100%;
    }
}
@media screen and (min-width: 768px) {
    .chat_body {
        width: 750px;
        display: grid;
        grid-template-columns: 1fr 3fr;
    }
    .chat_spin {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chat_main {
        height: 600px;
        grid-template-rows: 7fr 2fr;
    }
}
.chat_body {
    margin: 0;
    border-top: 1px solid #ebeef5;
}
.chat_title {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-auto-flow: column;
    position: relative;
    font-weight: 800;
}
.chat_title div:first-child {
    margin-right: 1rem;
}

.chat_title span {
    margin-right: 0.5rem;
    vertical-align: text-top;
}

.chat_slide {
    border-right: 1px solid #ebeef5;
}
.chat_main {
    display: grid;
    grid-auto-flow: column;
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

.chat_spin >>> .ant-spin {
    max-height: none;
}
.chat_spin >>> .ant-spin-blur {
    opacity: 0;
}
@media screen and (max-width: 768px) {
    .leave_button {
        display: none;
    }
}
.leave_button {
    position: absolute;
    top: 1rem;
    right: 8rem;
}
/* 只有小屏显示,这里不用display的原因,我是想在大屏幕状态其是纯粹没有的 */
@media screen and (max-width: 768px) {
    .leave_icon {
        position: absolute;
        top: 0;
        right: 0;
    }
    /* content是必须要写的,只有写了其,伪元素才能撑起来 */
    .leave_icon::after {
        content: "";
        background-image: url(../../assets/close.svg);
        position: absolute;
        width: 28px;
        height: 28px;
        background-size: cover;
        top: 3px;
        left: -28px;
    }
    .open_drawer {
        position: absolute;
        top: 0;
        left: 0;
    }
    .open_drawer::after {
        content: "";
        background-image: url(../../assets/menu.svg);
        position: absolute;
        width: 28px;
        height: 28px;
        background-size: cover;
        top: 3px;
    }
}

.chat_main_bottom {
    display: flex;
    flex-flow: column;
}
.chat_main_input {
    flex-grow: 1;
}
</style>
