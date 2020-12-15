<template>
    <div class="layout">
        <select-language></select-language>
        <router-view></router-view>
        <z-footer></z-footer>
    </div>
</template>

<script>
import SelectLanguage from '../components/SelectLanguage.vue'
import ZFooter from '../components/ZFooter.vue'
export default {
    components: {
        SelectLanguage,
        ZFooter,
    },
    setup() {
        return {}
    },
}
</script>

<style lang="css" scoped>
.layout {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/lighthouse.jpg"); */
}
</style>
