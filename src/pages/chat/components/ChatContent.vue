<template>
    <div class="chat_scroll" ref="chat_scroll" @scroll="scrollListener">
        <div
            class="chat_content"
            ref="chat_content"
            :style="{ height: listHeight }"
        >
            <div
                class="chat_msg_list"
                ref="msg_list_dom"
                :style="{ transform: getTransform }"
            >
                <template v-if="visibleData.length">
                    <message
                        v-for="(msg, index) in visibleData"
                        :key="index"
                        :user_id="msg.user_id"
                        :user_name="msg.user_name"
                        :message_content="msg.message_content"
                        :height="itemHeight"
                        @open="openDetails"
                    ></message>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {
    computed,
    onMounted,
    reactive,
    ref,
    watch,
    watchEffect,
    nextTick,
} from "vue";
import Message from "./Message.vue";
import { Modal } from "ant-design-vue";
import { useI18n } from "vue-i18n";
export default {
    components: {
        Message,
    },
    props: ["msgList", "itemHeight"],
    setup(props) {
        const { t } = useI18n();
        const chat_scroll = ref(null);
        const chat_content = ref(null);

        const startIndex = ref(0);
        const endIndex = ref(startIndex.value + 7);
        const startOffset = ref(0);
        const msg_list_dom = ref(null);

        onMounted(() => {
            // console.log(chat_scroll.value.scrollTopMax);
            // console.log(chat_content.value.offsetHeight);
            // console.log(chat_content.value.offsetHeight);
            msg_list_dom.value.scrollIntoView(false);
            console.log(chat_scroll.value.scrollTop, "mounted");
            console.log(chat_scroll.value.scrollHeight, "mounted");
            chat_scroll.value.scrollTop = chat_scroll.value.scrollHeight;
            console.log(chat_scroll.value.scrollTop, "mountedafter");
        });
        const listHeight = computed(() => {
            return `${props.msgList.length * props.itemHeight}px`;
        });
        const getTransform = computed(() => {
            return `translate3d(0,${startOffset.value}px,0)`;
        });

        const visibleData = computed(() => {
            console.log("computed");
            //这里未来可以优化
            return props.msgList.slice(
                startIndex.value,
                Math.min(endIndex.value, props.msgList.length)
            );
        });

        // watch(props.msgList, () => {});
        watch(props.msgList, (newValue, oldValue) => {
            //当添加msg时,始终让滚动条在最下面,注意这里,在代码获取scrollTop时,需要用nextTick
            nextTick(() => {
                console.log(chat_scroll.value.scrollTop, "watch");
                console.log(chat_scroll.value.scrollHeight, "watch");
                chat_scroll.value.scrollTop = chat_scroll.value.scrollHeight;
                console.log(chat_scroll.value.scrollTop, "watchafter");
            });
        });

        // watchEffect(() => {
        //     console.log("watchEffect");
        //     console.log(startIndex.value, endIndex.value);
        //     visibleData = props.msgList.slice(
        //         startIndex.value,
        //         Math.min(endIndex.value, props.msgList.length)
        //     );
        //     console.log(visibleData);
        // });
        const scrollListener = () => {
            //修改scrollTop的值相当于此事件执行了一次
            console.log("scroll");
            console.log(chat_scroll.value.scrollTop, "scroll");
            console.log(chat_scroll.value.scrollHeight, "scroll");
            const scrollTop = chat_scroll.value.scrollTop;
            startIndex.value = Math.floor(
                chat_scroll.value.scrollTop / props.itemHeight
            );
            endIndex.value = startIndex.value + 7;
            startOffset.value = scrollTop - (scrollTop % props.itemHeight);
            // chat_scroll.value.scroll = 0;
            // console.log(chat_scroll.value.scrollTop)
            // console.log(
            //     "scrollListener",
            //     chat_content.value.offsetHeight / chat_scroll.value.scrollTop
            // );
        };

        function openDetails(content) {
            Modal.info({
                title: t("label.chat.L008"),
                content: content,
                centered: true,
                maskClosable: true,
                width: 520,
                okText: t("label.global.L003"),
            });
        }

        return {
            chat_scroll,
            chat_content,
            scrollListener,
            visibleData,
            listHeight,
            getTransform,
            msg_list_dom,
            openDetails,
        };
    },
};
</script>

<style lang="css" scoped>
.chat_scroll {
    overflow-y: auto;
    overflow-x: hidden;
}
/* .chat_scroll::-webkit-scrollbar {
    display: none;
} */
</style>
