<template>
    <a-modal
        v-model:visible="dialogVisible"
        okText="confirm"
        title="Leave room"
        @ok="leaveRoom"
        centered
        :afterClose="destroy"
    >
        你确定要离开该房间吗?
    </a-modal>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import { get } from "../../../utils/http";
import { router } from "../../../router";

export default {
    props: ["visible", "destroy"],
    setup(props, content) {
        const dialogVisible = ref(props.visible);

        function leaveRoom() {
            router.push({ path: "/" });
            dialogVisible.value = false;
        }

        return {
            dialogVisible,
            leaveRoom,
        };
    },
};
</script>

<style lang="css" scoped>
</style>