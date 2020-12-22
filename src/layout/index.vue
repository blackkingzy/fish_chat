<template>
    <div class="layout">
        <div class="header">
            <z-header></z-header>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <div class="footer"><z-footer></z-footer></div>
    </div>
</template>

<script>
import ZFooter from '../components/ZFooter.vue'
import ZHeader from '../components/ZHeader.vue'
export default {
    components: {
        ZFooter,
        ZHeader,
    },
    setup() {
        return {}
    },
}
</script>

<style lang="css" scoped>
@media screen and (max-width: 768px) {
    .layout {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .header {
        display: none;
    }
    .main {
        height: 100%;
        width: 100%;
    }
    .footer {
        display: none;
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
