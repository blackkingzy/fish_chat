<template>
    <a-modal
        v-model:visible="dialogVisible"
        :okText="okText"
        :cancelText="cancelText"
        :title="title"
        centered
        :afterClose="close"
        :footer="footer"
        @ok="ok"
    >
        <slot name="default"></slot>
    </a-modal>
</template>

<script>
import { ref } from 'vue'
export default {
    //destroy是create传下来为了在关闭dialog是将页面在内存中销毁
    props: ['isShow', 'okText', 'cancelText', 'title', 'footer'],
    data() {
        return {
            dialogVisible: this.isShow,
        }
    },
    methods: {
        close() {
            this.$emit('update:isShow', false)
        },
        ok() {
            this.dialogVisible = false
        },
    },
    //在setup中,永远记住props中,除了引用类型(reactive([]),reactive({})或者ref([]),ref({})),其它类型的值父组件改变子组件中都监听不到
    watch: {
        isShow(newValue, oldValue) {
            this.dialogVisible = newValue
        },
    },
}
</script>

<style lang="css" scoped>
.dialog_wrapper {
    z-index: 2001;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* opacity: .5; */
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dialog {
    width: 300px;
    height: 300px;
    background: #fff;
}
</style>
