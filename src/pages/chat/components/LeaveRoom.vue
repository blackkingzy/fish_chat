<template>
    <a-modal
        v-model:visible="dialogVisible"
        :okText="t('label.global.L003')"
        :cancelText="t('label.global.L004')"
        :title="t('label.chat.L003')"
        @ok="leaveRoom"
        centered
        :afterClose="destroy"
    >
        {{ t("message.chat.M001") }}
    </a-modal>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import { get } from "../../../utils/http";
import { router } from "../../../router";
import { useI18n } from "vue-i18n";
export default {
    props: ["visible", "destroy"],
    setup(props, content) {
        const dialogVisible = ref(props.visible);
        const { t } = useI18n();

        function leaveRoom() {
            router.push({ path: "/" });
            dialogVisible.value = false;
        }

        return {
            dialogVisible,
            leaveRoom,
            t,
        };
    },
};
</script>

<style lang="css" scoped>
</style>