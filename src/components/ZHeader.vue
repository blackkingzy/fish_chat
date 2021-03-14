<template>
    <div class="header_contain">
        <div class="expand"></div>
        <select-language></select-language>
    </div>
</template>

<script>
import SelectLanguage from './SelectLanguage.vue'
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
.header_contain {
    display: grid;
    grid-template-columns: 8fr 2fr;
    height: 100%;
}
</style>
