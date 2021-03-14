<template>
    <div class="error">
        <div>
            <img class="error_img" src="../../assets/404.png" alt="404" />
        </div>
        <div class="error_tip">
            <div class="warn">OOPS!</div>
            <div class="info">The page was not found...</div>
            <div class="back_info">
                Please check that the URL you entered is correct, or click the
                button below to return to the homepage.
            </div>
            <div class="back_button">
                <!-- <a :href="store.getters.domain">Back to home</a> -->
                <a :href="`http://${store.getters.domain}:3000`"
                    >Back to home</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import ZButton from '../../components/ZButton.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    components: {
        ZButton,
    },
    setup() {
        const store = useStore()
        const href = computed(() => {
            if (store.getters.domain.indexof('www') !== -1) {
                return `http://${store.getters.domain}`
            } else {
                ;`http://${store.getters.domain}:${store.getters.port}`
            }
        })
        return { store }
    },
}
</script>

<style lang="css" scoped>
@media screen and (max-width: 768px) {
    .error {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 2rem 0 0 2rem;
    }
    .error_img {
        width: 100%;
    }
    .error_tip {
        margin-top: 2rem;
    }
}
@media screen and (min-width: 768px) {
    .error {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .error_img {
        width: 600px;
    }
}
.error {
    height: 100%;
}
.warn {
    color: #f5222d;
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 10px;
}
.info {
    font-size: 2rem;
    color: #faad14;
    margin-bottom: 10px;
    font-weight: 800;
}
.back_info {
    color: rgba(0, 0, 0, 0.65);
}
.back_button a {
    display: block;
    background: #1482f0;
    color: #fff;
    /* font-size: 1.5rem; */
    height: 2rem;
    width: 6rem;
    line-height: 2rem;
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    margin-top: 0.8rem;
}
</style>
