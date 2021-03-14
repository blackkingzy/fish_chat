<template>
    <a-drawer
        :title="t('label.drawer.L001')"
        placement="left"
        :closable="false"
        v-model:visible="drawerVisible"
        @close="close"
        wrapClassName="drawer"
    >
        <div class="drawer_lang">
            <select-language></select-language>
        </div>
        <div class="drawer_people"><chat-slide></chat-slide></div>
        <div class="drawer_footer"><z-footer></z-footer></div>
    </a-drawer>
</template>

<script>
import { ref, watch } from 'vue'
import ChatSlide from './ChatSlide.vue'
import SelectLanguage from '../../../components/SelectLanguage.vue'
import ZFooter from '../../../components/ZFooter.vue'
import { useI18n } from 'vue-i18n'

export default {
    components: {
        SelectLanguage,
        ChatSlide,
        ZFooter,
    },
    props: ['isShow'],
    setup() {
        const { t } = useI18n()
        return { t }
    },
    data() {
        return {
            drawerVisible: this.isShow,
        }
    },
    methods: {
        close() {
            this.$emit('update:isShow', false)
        },
    },
    //在setup中,永远记住props中,除了引用类型(reactive([]),reactive({})或者ref([]),ref({})),其它类型的值父组件改变子组件中都监听不到
    watch: {
        isShow(newValue, oldValue) {
            this.drawerVisible = newValue
        },
    },
}
</script>

<style lang="css">
.drawer_people {
    flex-grow: 1;
    margin-top: 0.8rem;
    /* height: 470px; */
}

.drawer_body {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.drawer .ant-drawer-wrapper-body {
    display: flex;
    flex-direction: column;
}

.drawer .ant-drawer-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
