<template>
    <div class="error">
        <div class="error_img_contain">
            <img class="error_img" src="../../assets/503.gif" alt="503" />
        </div>
        <div class="error_tip">
            <div class="warn">OOPS!</div>
            <div class="info">Service Unavailable...</div>
            <div class="back_info">
                No server is available to handle this request, please browse
                other websites first, thank you...
            </div>
            <div class="back_button">
                <a href="http://www.baidu.com">Go</a>
            </div>
        </div>
    </div>
</template>

<script>
import ZButton from '../../components/ZButton.vue'
export default {}
</script>

<style lang="css" scoped>
@media screen and (max-width: 768px) {
    .error {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 2rem 0 0 2rem;
    }
    .error_img_contain {
        text-align: center;
    }
    .error_img {
        width: 219px;
        height: 300px;
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
        width: 313px;
        height: 428px;
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
    width: 4rem;
    line-height: 2rem;
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    margin-top: 0.8rem;
}
</style>
