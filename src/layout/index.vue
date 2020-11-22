<template>
    <div class="layout">
        <select-language>11</select-language>
        <router-view></router-view>
    </div>
</template>

<script>
import SelectLanguage from "../components/SelectLanguage.vue";
export default {
    components: {
        SelectLanguage,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="css" scoped>
</style>