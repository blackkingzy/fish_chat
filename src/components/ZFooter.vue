<template>
    <div class="footer_contain">
        <div class="footer_content">
            <div><pre>©CopyRight 2020    版权所有 www.blackyue.com</pre></div>
            <div>
                <pre><span class="police"></span>蒙ICP备20001860号  京公网安备21021102000825号</pre>
            </div>
            <div>
                <ul class="icon-list">
                    <li>
                        <a
                            class="github"
                            target="_blank"
                            href="https://github.com/blackkingzy"
                        ></a>
                    </li>
                    <li>
                        <a-popover>
                            <template #content>
                                <img
                                    class="QRcode"
                                    src="https://qn.antdv.com/wechat.jpeg"
                                    alt="qq"
                                />
                            </template>
                            <a class="wechat"></a>
                        </a-popover>
                    </li>
                    <li>
                        <a-popover>
                            <template #content>
                                <img
                                    class="QRcode"
                                    src="https://qn.antdv.com/wechat.jpeg"
                                    alt="qq"
                                />
                            </template>
                            <a class="qq"></a>
                        </a-popover>
                    </li>
                    <li class="note_pc">
                        <a-popover>
                            <template #content>
                                <Note></Note>
                            </template>
                            <a class="Note"></a>
                        </a-popover>
                    </li>
                    <li class="note_mobile">
                        <a class="Note" @click="openNote"></a>
                        <z-dialog
                            v-model:isShow="isShow"
                            :title="t('label.note.L001')"
                            :footer="null"
                            ><Note></Note
                        ></z-dialog>
                    </li>
                    <li class="site_details">
                        <a class="Info" @click="openDetails"></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Note from "./Note.vue";
import ZDialog from "./ZDialog.vue";
import { createVNode, ref } from "vue";
import { useI18n } from "vue-i18n";
import about from "../pages/about/index.vue";
import { create } from "../utils/create.js";
import { get } from "../utils/http.js";
export default {
    components: {
        Note,
        ZDialog,
    },
    setup() {
        const { t } = useI18n();
        const isShow = ref(false);
        function openNote() {
            isShow.value = true;
        }

        async function openDetails() {
            try {
                const aboutInfo = await get("api/about");
                create(about, { visible: true, aboutInfo });
            } catch (error) {
                console.log(error);
            }
        }

        return {
            openNote,
            isShow,
            openDetails,
            t,
        };
    },
};
</script>

<style lang="css" scoped>
@media screen and (min-width: 768px) {
    .footer_contain {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon-list li.note_mobile {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .icon-list li.note_pc {
        display: none;
    }
}
.footer_contain {
    font-size: 0.8rem;
    height: 100%;

    color: #909090;
}
.footer_contain pre {
    font-size: 0.8rem;
    margin: 0;
}
.icon-list {
    list-style: none;
    margin: 0;
    padding: 0;
    vertical-align: text-bottom;
}
.icon-list li {
    margin-right: 2px;
    display: inline-block;
}
.icon-list li a {
    width: 28px;
    height: 28px;
    display: inline-block;
    background-image: url(../assets/icon.svg);
    background-repeat: no-repeat;
    vertical-align: middle;
}
.wechat {
    background-position: -140px;
}
.qq {
    background-position: -56px;
}
.Note {
    background-image: url(../assets/note.svg) !important;
    background-position: center;
}
.Info {
    background-image: url(../assets/info.svg) !important;
    background-size: cover;
}
.QRcode {
    width: 150px;
    height: 150px;
}
.police {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    background-image: url(../assets/police.svg);
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: text-bottom;
}
</style>
