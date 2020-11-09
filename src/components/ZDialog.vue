<template>
    <div class="dialog_wrapper" v-if="isShow" @click="handleClose">
        <div class="dialog">
            <div class="dialog_header"><button class="Close">123</button></div>
            <div class="dialog_main"></div>
            <div class="dialog_footer"></div>
        </div>
    </div>
</template>

<script>
export default {
    //destroy是create传下来为了在关闭dialog是将页面在内存中销毁
    props: ["isShow", "close", "destroy"],
    setup(props, content) {
        function handleClose() {
            content.emit("update:isShow", false);
            props.close();
            props.destroy();
        }
        return { handleClose };
    },
};
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
.dialog{
    width: 300px;
    height: 300px;
    background: #fff;
}
</style>