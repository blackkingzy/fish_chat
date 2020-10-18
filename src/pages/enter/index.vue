<template>
    <div class="enter">
        <z-input
            id="room"
            v-model="room_id"
            label="请输入房间号"
            placeholder="Please enter the room NO"
        ></z-input>
        <z-input
            id="user_name"
            v-model="userName"
            label="请输入昵称"
            placeholder="Please enter the name"
        ></z-input>
        <div class="enter_button">
            <z-button @click="create" type="new" class="create_button"
                >create</z-button
            >
            <z-button @click="enter" type="main" class="create_button"
                >Enter</z-button
            >
        </div>
    </div>
</template>

<script>
import { useSetUserInfo, useSetRoomInfo } from "../../store/index.js";
import ZInput from "./components/ZInput.vue";
import ZButton from "../../components/ZButton.vue";
import { reactive, watchEffect, ref } from "vue";
import { router } from "../../router";
import { get } from "../../utils/http";
export default {
    components: {
        ZInput,
        ZButton,
    },
    setup() {
        const room_id = ref("");
        const userName = ref("");

        function enter() {
            console.log("请求进入房间");
            const params = { room_id: room_id.value, name: userName.value };
            get("/api/enter", params, successEnter, faultEnter);
        }

        function create() {
            console.log("请求创建房间");
        }

        function successEnter(data) {
            console.log(data);
            //请求成功跳转页面
            // useSetUserInfo();
            // useSetRoomInfo();
            const userInfo = {
                userName: userName.value,
                avatar: "../../../assets/logo.png",
            };
            useSetUserInfo(userInfo);
            router.push({ path: "/chat" });
        }

        function faultEnter(error) {
            console.log(error);
        }

        const test = ref(0);
        watchEffect(() => {
            console.log(`${test.value}hook`);
        });

        return { room_id, userName, enter, create };
    },
};
</script>

<style lang="css" scoped>
.enter {
    width: 400px;
}
.enter >>> button {
    color: #fff;
    font-size: 2rem;
    width: 100%;
    border-radius: 4px;
    height: 4rem;
}
.enter_button {
    display: flex;
    justify-content: center;
}
.enter_button,
.create_button {
    flex-grow: 1;
}
</style>
