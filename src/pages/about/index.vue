<template>
    <a-modal
        v-model:visible="dialogVisible"
        :title="t('label.about.L001')"
        :footer="null"
        centered
        :afterClose="destroy"
        width="800px"
    >
        <div class="details_content">
            <a-descriptions :title="t('label.about.L002')">
                <a-descriptions-item :label="t('label.about.L003')">
                    {{ aboutInfo.developerInfo.nickName }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L004')">
                    {{ aboutInfo.developerInfo.email }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L005')">
                    {{ aboutInfo.developerInfo.job }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L006')">
                    {{ `${jobTime}` }}
                </a-descriptions-item>
            </a-descriptions>
            <a-descriptions :title="t('label.about.L007')">
                <a-descriptions-item :label="t('label.about.L008')">
                    {{ aboutInfo.frontEndInfo.vite }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L009')">
                    {{ aboutInfo.frontEndInfo.vue }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L010')">
                    {{ aboutInfo.frontEndInfo.vueRouter }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L011')">
                    {{ aboutInfo.frontEndInfo.vuex }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L012')">
                    {{ aboutInfo.frontEndInfo.axios }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L013')">
                    {{ aboutInfo.frontEndInfo.socketioClient }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L014')">
                    {{ aboutInfo.frontEndInfo.antd }}
                </a-descriptions-item>
            </a-descriptions>
            <a-descriptions :title="t('label.about.L015')">
                <a-descriptions-item :label="t('label.about.L016')">
                    {{ aboutInfo.backEndInfo.node }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L017')">
                    {{ aboutInfo.backEndInfo.frame }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L018')">
                    {{ aboutInfo.backEndInfo.server }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('label.about.L019')">
                    {{ aboutInfo.backEndInfo.memorySize }}
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </a-modal>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { get } from "../../utils/http";
import { getTimeDiff } from "../../utils/index.js";
export default {
    props: ["visible", "destroy", "aboutInfo"],
    setup(props, content) {
        const { t } = useI18n();
        const dialogVisible = ref(props.visible);

        const now = ref(new Date());

        setInterval(() => {
            now.value = new Date();
        }, 1000);

        const jobTime = computed(() => {
            return getTimeDiff(
                new Date(props.aboutInfo.developerInfo.jobStartTime),
                now.value
            );
        });

        return { dialogVisible, t, jobTime };
    },
};
</script>

<style lang="css" scoped>
.details_content >>> .ant-descriptions-title {
    font-weight: 600;
    color: #ff6666;
}
.details_content >>> .ant-descriptions-item-label {
    font-weight: 400;
    color: #0099cc;
}

.details_content >>> .ant-descriptions-item-content {
    color: #666666;
}
</style>