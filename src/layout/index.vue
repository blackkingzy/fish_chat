<template>
    <div class="layout">
        <select-language></select-language>
        <router-view></router-view>
    </div>
</template>

<script>
import SelectLanguage from '../components/SelectLanguage.vue'
export default {
    components: {
        SelectLanguage,
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
