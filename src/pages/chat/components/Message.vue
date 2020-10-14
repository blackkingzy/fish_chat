<template>
    <div class="message" v-bind:class="msg_positon" ref="messageDom">
        <div class="avatar" v-if="name !== userInfo.userName">
            <img src="../../../assets/logo.png" alt="Avatar" />
        </div>
        <div class="message_info">
            <div class="name">{{ name }}</div>
            <div class="message_content">{{ message_content }}</div>
        </div>
        <div class="avatar" v-if="name === userInfo.userName">
            <img src="../../../assets/logo.png" alt="Avatar" />
        </div>
    </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { userInfo } from "../../../store/index.js";
export default {
    props: {
        avatar: {
            type: String,
            default: "../../../assets/logo.png",
        },
        name: String,
        message_content: String,
    },
    setup(props) {
        const messageDom = ref(null);

        onMounted(() => {
            // 在渲染完成后, 这个 div DOM 会被赋值给 message ref 对象
            //让可视区始终保持在最下面
            messageDom.value.scrollIntoView(false);
        });
        const msg_positon = computed(() => {
            return { self_message: props.name === userInfo.userName };
        });

        return { messageDom, msg_positon, userInfo };
    },
};
</script>

<style lang="css" scoped>
.self_message {
    justify-content: flex-end;
}
.self_message .message_content {
    background-color: #00ff00;
    margin: 0.5rem 0.5rem 0 0.5rem;
}

.self_message .name {
    text-align: end;
}

.avatar {
    width: 2rem;
    height: 2rem;
    /* border: 1px red solid; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.2rem;
}
.avatar img {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
}
.message {
    display: flex;
    padding-bottom: 0.5rem;
    /* align-items: center; */
}
.message_content {
    display: inline-block;
    text-align: start;
    border: 1px black solid;
    border-radius: 0.3rem;
    margin: 0.5rem 0.5rem 0 0.5rem;
    word-break: break-all;
    padding: 0.2rem;
    font-weight: 500;
    white-space: pre-wrap;
}
.name {
    font-size: 0.8rem;
}
</style>