<template>
    <layout wrapperClass="enter"
        ><div class="enter_contain">
            <div class="enter_main">
                <z-input
                    id="room"
                    v-model="room_No"
                    :label="t('label.enter.L003')"
                    size="large"
                    labelWidth="7em"
                ></z-input>
                <z-input
                    id="user_name"
                    v-model="user_name"
                    :label="t('label.enter.L004')"
                    size="large"
                    labelWidth="7em"
                ></z-input>
                <div class="enter_button">
                    <z-button
                        @click="createRoom"
                        type="new"
                        class="create_button"
                        >{{ t("label.enter.L001") }}</z-button
                    >
                    <z-button
                        @click="enterRoom"
                        type="main"
                        class="create_button"
                        >{{ t("label.enter.L002") }}</z-button
                    >
                </div>
            </div>
        </div></layout
    >
</template>

<script>
import layout from "../../layout/index.vue";
import ZInput from "../../components/ZInput.vue";
import ZButton from "../../components/ZButton.vue";
import { reactive, watchEffect, ref, getCurrentInstance, onMounted } from "vue";
import { router } from "../../router";
import { get, post } from "../../utils/http";
import { create } from "../../utils/create";
// import CreateRoom from "../create/index.vue";
import short from "short-uuid";
import { setCookie } from "../../utils/cookie.js";
import { useStore } from "vuex";
import { validate } from "../../utils/validate.js";
import CreateRandomRoom from "./components/CreateRandomRoom.vue";
import { useI18n } from "vue-i18n";
import { useRules } from "./rules.js";
import inputpassword from "./components/InputPassword.js";

export default {
    components: {
        ZInput,
        ZButton,
        layout,
    },
    setup() {
        const {
            $message,
        } = getCurrentInstance().appContext.config.globalProperties;
        const store = useStore();
        const { t } = useI18n();

        const room_No = ref("");
        const user_name = ref("");
        let user_id = "";

        //进入房间模块
        async function enterRoom() {
            console.log("请求进入房间");
            try {
                await validate(
                    {
                        room_No: room_No.value,
                        user_name: user_name.value,
                    },
                    useRules(t, "enter")
                );
                const { isHasPassword } = await get("/api/isHasPassword", {
                    room_No: room_No.value,
                });
                let password = "";
                if (isHasPassword) {
                    password = await inputpassword(t, false);
                }
                user_id = short.generate();
                const user_info = {
                    user_id: user_id,
                    user_name: user_name.value,
                };
                const room_info = {
                    room_No: room_No.value,
                    room_password: password,
                };
                const data = { room_info, user_info };
                await post("/api/enter", data, successEnter, fault);
            } catch (error) {
                if (error) {
                    console.log(error);
                    $message.error(error.message);
                }
            }
        }
        //通用的错误回调函数
        function fault(error) {
            $message.error(error.message);
        }

        function successEnter(data) {
            console.log(data);
            //请求成功跳转页面
            const params = {
                user_info: {
                    user_id: user_id,
                    user_name: user_name.value,
                },
                room_No: data.room_No,
                room_info: data.room_info,
            };
            store.dispatch("successEnter", params);
            setCookie("token", data.token);
            router.push({ path: "/chat" });
        }

        //创建房间模块
        const createRoom = async () => {
            try {
                await validate(
                    {
                        user_name: user_name.value,
                    },
                    useRules(t)
                );
                user_id = short.generate();
                let password = "";
                const user_info = {
                    user_id: user_id,
                    user_name: user_name.value,
                };
                const room_info = {
                    room_No: room_No.value,
                    room_password: password,
                };
                const data = { room_info, user_info };
                //如果自己输入了room_No
                if (room_No.value) {
                    password = await inputpassword(t);
                    await post("/api/create", data, successCreate, fault);
                } else {
                    create(CreateRandomRoom, {
                        visible: true,
                        params: data,
                        success: successCreate,
                        fault: fault,
                    });
                }
            } catch (error) {
                if (error) {
                    console.log(error);
                    $message.error(error.message);
                }
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
                setCookie("token", data.token);
                router.push({ path: "/chat" });
            }
            //通用的错误回调函数
            // function fault(error) {
            //     $message.error(error.message)
            // }
        };

        // const test = ref(0)
        // watchEffect(() => {
        //     console.log(`${test.value}hook`)
        // })
        return { room_No, user_name, createRoom, enterRoom, t };
    },
}
</script>

<style lang="css" scoped>
.enter_contain {
    height: 100%;
}
@media screen and (min-width: 768px) {
    .enter_contain {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .enter_main {
        width: 465px;
    }
}
@media screen and (max-width: 768px) {
    .enter_contain {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }
}
.enter_main {
    text-align: center;
}
.enter_main >>> button {
    color: #fff;
    font-size: 2rem;
    width: 100%;
    border-radius: 4px;
    height: 4rem;
}
.enter_main >>> .z-input {
    margin-bottom: 2rem;
}
.enter_button {
    display: flex;
    justify-content: center;
}
.enter_button,
.create_button {
    flex: 1;
}

.select_avator span:first-child {
    width: 7em;
    font-size: 2rem;
    color: rgb(0, 0, 0);
    font-weight: 700;
    text-align: justify;
    display: inline-block;
}

.input_password .z-input {
    margin: 0;
}
</style>
