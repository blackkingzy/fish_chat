<template>
    <div class="chat_scoll" ref="chat_scoll" @scroll="scrollListener">
        <div class="chat_content" ref="chat_content">
            <template v-if="msgList.length">
                <message
                    v-for="(msg, index) in msgList"
                    :key="index"
                    :user_id="msg.user_id"
                    :user_name="msg.user_name"
                    :message_content="msg.message_content"
                ></message>
            </template>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Message from "./Message.vue";
export default {
    components: {
        Message,
    },
    props: ["msgList"],
    setup() {
        const chat_scoll = ref(null);
        const chat_content = ref(null);
        onMounted(() => {
            // console.log(chat_scoll.value.scrollTopMax);
            // console.log(chat_content.value.offsetHeight);
            // console.log(chat_content.value.offsetHeight);
        });
        const scrollListener = () => {
            // chat_scoll.value.scrollTop = chat_scoll.value.scrollHeight
            console.log(chat_scoll.value.scrollHeight);
            console.log(chat_scoll.value.scrollTop)
            // chat_scoll.value.scroll = 0;
            // console.log(chat_scoll.value.scrollTop)
            // console.log(
            //     "scrollListener",
            //     chat_content.value.offsetHeight / chat_scoll.value.scrollTop
            // );
        };

        return { chat_scoll, chat_content, scrollListener };
    },
};
</script>

<style lang="css" scoped>
.chat_scoll {
    overflow-y: auto;
    overflow-x: hidden;
}
/* .chat_scoll::-webkit-scrollbar {
    display: none;
} */
</style>