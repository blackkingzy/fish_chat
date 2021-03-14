<template>
    <div
        class="message"
        v-bind:class="msg_positon"
        ref="messageDom"
        :style="{ height: `${height}px` }"
    >
        <div class="avatar" v-if="user_id !== store.getters.user_info.user_id">
            <img src="../../../assets/arrow-other.png" alt="Avatar" />
        </div>
        <div class="message_info">
            <div class="name">{{ user_name }}</div>
            <div
                class="message_content"
                @click="$emit('open', message_content)"
            >
                <!-- <div class="message_arrow"></div> -->
                {{ message_content }}
            </div>
        </div>
        <div class="avatar" v-if="user_id === store.getters.user_info.user_id">
            <img src="../../../assets/arrow-me.png" alt="Avatar" />
        </div>
    </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    props: {
        avatar: {
            type: String,
            default: '../../../assets/logo.png',
        },
        user_id: String,
        user_name: String,
        message_content: String,
        height: String,
    },
    setup(props) {
        const messageDom = ref(null)
        const store = useStore()

        onMounted(() => {
            // 在渲染完成后, 这个 div DOM 会被赋值给 message ref 对象
            //让可视区始终保持在最下面
            // messageDom.value.scrollIntoView(false)
        })
        const msg_positon = computed(() => {
            return {
                self_message: props.user_id === store.getters.user_info.user_id,
            }
        })

        return { messageDom, msg_positon, store }
    },
}
</script>

<style lang="css" scoped>
.self_message {
    justify-content: flex-end;
}
.self_message .message_content {
    background-color: #00ff00;
    margin: 0.1rem 0.5rem 0 0.5rem;
}
.message_info {
    overflow: hidden;
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
    /* align-items: center; */
}
.message_content {
    display: inline-block;
    text-align: start;
    /* border: 1px black solid;
    border-radius: 0.3rem; */
    border-radius: 0 4px 4px 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    margin: 0.1rem 0.5rem 0 0.5rem;
    word-break: break-all;
    padding: 0.2rem;
    font-weight: 500;
    white-space: pre-wrap;
    position: relative;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-word;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    cursor: pointer;
}
.name {
    font-size: 0.8rem;
}

.message_arrow {
    position: absolute;
    display: block;
    width: 12px;
    height: 12px;
    background: transparent;
    border-style: solid;
    /* transform: translate(-50%, -50%) ; */
    border: 1px solid #ebeef5;
}
</style>
