<template>
    <div class="note_contain">
        <a-card style="border: none">
            <p style="color: rgb(0, 153, 255)">
                {{ `${t("message.note.M002")}😄` }}
            </p>
            <p>
                {{ `${t("message.note.M002")}👮` }}
            </p>
            <p>{{ `${t("message.note.M003")}🔥` }}</p>
            <p>{{ `${t("message.note.M004")}💬` }}</p>
            <p>
                {{ t("message.note.M005") }}
                <strong
                    ><a
                        target="_blank"
                        href="https://github.com/blackkingzy/fish_chat"
                        >https://github.com/blackkingzy/fish_chat</a
                    ></strong
                ><br />
                {{ t("message.note.M006") }}
                <strong
                    ><a
                        target="_blank"
                        href="https://github.com/blackkingzy/fish_chat_interface"
                        >https://github.com/blackkingzy/fish_chat_interface</a
                    ></strong
                ><br />
                <strong>{{ `${t("message.note.M007")}👍🙏😘` }}</strong>
            </p>
            <p>
                {{ t("message.note.M008") }}
                <strong>1003975792@qq.com✉</strong>
            </p>
            <p>
                <em style="color: red; font-weight: 700">{{
                    `${t("message.note.M009")}🌼`
                }}</em>
            </p>
        </a-card>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
    name: "note",
    setup() {
        const { t } = useI18n();
        return { t };
    },
};
</script>

<style lang="css" scoped>
.note_contain {
    width: 540px;
}
@media screen and (max-width: 768px) {
    .note_contain {
        width: 100%;
    }
}
</style>