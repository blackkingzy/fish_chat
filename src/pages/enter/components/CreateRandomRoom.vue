<template>
    <a-modal
        v-model:visible="dialogVisible"
        :okText="t('label.global.L003')"
        :cancelText="t('label.global.L004')"
        :title="t('label.enter.L005')"
        @ok="createRoom"
        centered
        :afterClose="destroy"
    >
        {{ t("message.enter.M003") }}
    </a-modal>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import { post } from "../../../utils/http";
import { router } from "../../../router";
import { useI18n } from "vue-i18n";

export default {
    props: ["visible", "destroy", "params", "success", "fault"],
    setup(props, content) {
        const dialogVisible = ref(props.visible);
        const { t } = useI18n();

        function createRoom() {
            post(
                "/api/create",
                props.params,
                (data) => {
                    props.success(data);
                    dialogVisible.value = false;
                },
                props.fault
            );
        }

        return {
            dialogVisible,
            createRoom,
            t,
        };
    },
};
</script>

<style lang="css" scoped></style>
