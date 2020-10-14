<template>
    <div class="chat_slide">
        <template v-if="userList.length">
            <user-info
                v-for="(user, index) in userList"
                :key="index"
                :user_name="user.name"
                :avatar="user.avatar"
            ></user-info>
        </template>
    </div>
</template>

<script>
import { reactive } from "vue";
import UserInfo from "./UserInfo.vue";
export default {
    components: {
        UserInfo,
    },
    setup() {
        const userList = reactive([
            {
                name: "王铮",
                avatar: "../../../assets/logo.png",
            },
            {
                name: "zhangyue",
                avatar: "../../../assets/logo.png",
            },
            {
                name: "11111111111111111111111111111111111",
                avatar: "../../../assets/logo.png",
            },
        ]);

        return { userList };
    },
};
</script>

<style lang="css" scoped>
.chat_slide {
    overflow-x: hidden;
}
</style>
