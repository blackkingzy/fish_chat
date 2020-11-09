<template>
    <a-modal
        v-model:visible="dialogVisible"
        title="Create room"
        @ok="createRoom"
        centered
        :afterClose="destroy"
        width="500"
        :confirmLoading="confirmLoading"
    >
        <z-input
            id="creat_room"
            v-model="room_No"
            label="请输入房间号"
            placeholder="Please enter the room NO"
            type="medium"
            labelWidth="7em"
        ></z-input>
        <z-input
            id="user_name"
            v-model="user_name"
            label="请输入昵称"
            placeholder="Please enter the name"
            type="medium"
            labelWidth="7em"
        ></z-input>
    </a-modal>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import ZInput from "../../components/ZInput.vue";
import { post } from "../../utils/http";
import short from "short-uuid";
import { router } from "../../router";
import { setToken } from "../../utils/auth";
import { useStore } from "vuex";

export default {
    props: ["visible", "destroy"],
    components: {
        ZInput,
    },
    setup(props, content) {
        // const instance = getCurrentInstance();获取实例的方法。记住
        const dialogVisible = ref(props.visible);
        const confirmLoading = ref(false);

        const store = useStore();
        console.log(store);

        const room_No = ref("");
        const user_name = ref("");
        let user_id = "";

        function createRoom() {
            user_id = short.generate();
            confirmLoading.value = true;
            const user_info = { user_id: user_id, user_name: user_name.value };
            const data = { room_No: room_No.value, user_info };
            post("/api/create", data, successCreate, faultCreate);
        }
        function successCreate(data) {
            const params = {
                user_info: {
                    user_id: user_id,
                    user_name: user_name.value,
                },
                room_No: data.room_No,
                room_info: data.room_info,
            };
            
            store.dispatch("successEnter", params);
            console.log(params);
            dialogVisible.value = false;
            confirmLoading.value = false;
            setToken(data.token);
            router.push({ path: "/chat" });
        }

        function faultCreate(error) {
            console.log(error);
            console.log("fault");
        }

        return {
            room_No,
            user_name,
            dialogVisible,
            createRoom,
            confirmLoading,
        };
    },
    created() {
        console.log("create");
    },
};
</script>

<style lang="css" scoped>
</style>