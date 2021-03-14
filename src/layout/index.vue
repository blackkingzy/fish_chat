<template>
    <div class="layout" :class="wrapperClass">
        <div class="header">
            <z-header></z-header>
        </div>
        <div class="main">
            <slot name="default"></slot>
            <!-- <router-view></router-view> -->
        </div>
        <div class="footer"><z-footer></z-footer></div>
    </div>
</template>

<script>
import { computed } from 'vue'
import ZFooter from '../components/ZFooter.vue'
import ZHeader from '../components/ZHeader.vue'
export default {
    props: {
        wrapperClass: {
            type: String,
        },
    },
    components: {
        ZFooter,
        ZHeader,
    },
}
</script>

<style lang="css" scoped>
@media screen and (max-width: 768px) {
    .layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }
}
@media screen and (min-width: 768px) {
    .layout {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: 1fr 8fr 1fr;
    }
}
.layout {
    height: 100%;
    /* background: url("../assets/lighthouse.jpg"); */
}
.main {
    position: relative;
}
</style>
