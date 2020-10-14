<template>
    <div class="enter">
        <z-input
            id="room"
            v-model="roomNumber"
            label="请输入房间号"
            placeholder="Please enter the room NO"
        ></z-input>
        <z-input
            id="user_name"
            v-model="userName"
            label="请输入昵称"
            placeholder="Please enter the name"
        ></z-input>
        <z-button @click="enter">Enter</z-button>
    </div>
</template>

<script>
import { useSetUserInfo, useSetRoomInfo } from "../../store/index.js";
import ZInput from "./components/ZInput.vue";
import ZButton from "../../components/ZButton.vue";
import { reactive, watchEffect, ref } from "vue";
import { router } from "../../router";
export default {
    components: {
        ZInput,
        ZButton,
    },
    setup() {
        const roomNumber = ref("");
        const userName = ref("");

        function enter() {
            console.log("请求进入房间");
            //发送请求
            //请求成功跳转页面
            // useSetUserInfo();
            // useSetRoomInfo();
            const userInfo = {
                userName: "zhangyue",
                avatar: "../../../assets/logo.png",
            };
            useSetUserInfo(userInfo);
            router.push({ path: "/chat" });
        }
        const test = ref(0);
        watchEffect(() => {
            console.log(`${test.value}hook`);
        });

        return { roomNumber, userName, enter };
    },
};
</script>

<style lang="css" scoped>
.enter {
    margin-left: 14rem;
}
.enter >>> button {
    color: #fff;
    font-size: 2rem;
    width: 100%;
    border-radius: 4px;
    height: 4rem;
    background-color: #0099ff;
}
</style>
