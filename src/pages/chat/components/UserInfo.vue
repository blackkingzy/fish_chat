<template>
    <div class="user">
        <div class="user_avatar">
            <img src="../../../assets/logo.png" alt="Avatar" />
        </div>
        <div class="user_name" :title="user_name">
            {{ user_name }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        avatar: {
            type: String,
            default: "../../../assets/logo.png",
        },
        user_name: String,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="css" scoped>
.user_avatar {
    width: 2rem;
    height: 2rem;
    /* border: 1px red solid; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.2rem;
}
.user_avatar img {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
}
.user {
    display: flex;
    line-height: 2rem;
}
.user_name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
