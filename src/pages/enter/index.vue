<template>
    <div class="enter_contain">
        <div class="enter_header">
            <z-header></z-header>
        </div>
        <div class="enter_main">
            <z-input
                id="room"
                v-model="room_No"
                :label="t('label.enter.L003')"
                type="large"
                labelWidth="7em"
            ></z-input>
            <z-input
                id="user_name"
                v-model="user_name"
                :label="t('label.enter.L004')"
                type="large"
                labelWidth="7em"
            ></z-input>
            <div class="enter_button">
                <z-button
                    @click="createRoom"
                    type="new"
                    class="create_button"
                    >{{ t('label.enter.L001') }}</z-button
                >
                <z-button
                    @click="enterRoom"
                    type="main"
                    class="create_button"
                    >{{ t('label.enter.L002') }}</z-button
                >
            </div>
        </div>
        <div class="enter_footer">
            <z-footer></z-footer>
        </div>
    </div>
</template>

<script>
import ZInput from '../../components/ZInput.vue'
import ZButton from '../../components/ZButton.vue'
import { reactive, watchEffect, ref, getCurrentInstance } from 'vue'
import { router } from '../../router'
import { get, post } from '../../utils/http'
import { create } from '../../utils/create'
// import CreateRoom from "../create/index.vue";
import short from 'short-uuid'
import { setCookie } from '../../utils/cookie.js'
import { useStore } from 'vuex'
import { validate } from '../../utils/validate.js'
import CreateRandomRoom from './components/CreateRandomRoom.vue'
import { useI18n } from 'vue-i18n'
import { useRules } from './rules.js'
import ZFooter from '../../components/ZFooter.vue'
import ZHeader from '../../components/ZHeader.vue'

export default {
    components: {
        ZInput,
        ZButton,
        ZFooter,
        ZHeader,
    },
    setup() {
        const {
            $message,
        } = getCurrentInstance().appContext.config.globalProperties
        const store = useStore()
        const { t, locale } = useI18n()

        const room_No = ref('')
        const user_name = ref('')
        let user_id = ''

        //进入房间模块
        async function enterRoom() {
            console.log('请求进入房间')
            try {
                await validate(
                    {
                        room_No: room_No.value,
                        user_name: user_name.value,
                    },
                    useRules(locale, t, 'enter')
                )
                user_id = short.generate()
                const user_info = {
                    user_id: user_id,
                    user_name: user_name.value,
                }
                const data = { room_No: room_No.value, user_info }
                await post('/api/enter', data, successEnter, fault)
            } catch (error) {
                $message.error(error.message)
            }
        }
        //通用的错误回调函数
        function fault(error) {
            $message.error(error.message)
        }

        function successEnter(data) {
            console.log(data)
            //请求成功跳转页面
            const params = {
                user_info: {
                    user_id: user_id,
                    user_name: user_name.value,
                },
                room_No: data.room_No,
                room_info: data.room_info,
            }
            store.dispatch('successEnter', params)
            setCookie('token', data.token)
            router.push({ path: '/chat' })
        }

        //创建房间模块
        async function createRoom() {
            try {
                await validate(
                    {
                        user_name: user_name.value,
                    },
                    useRules(locale, t)
                )
                user_id = short.generate()
                const user_info = {
                    user_id: user_id,
                    user_name: user_name.value,
                }
                const data = { room_No: room_No.value, user_info }
                //如果自己输入了room_No
                if (room_No.value) {
                    user_id = short.generate()
                    const user_info = {
                        user_id: user_id,
                        user_name: user_name.value,
                    }
                    const data = { room_No: room_No.value, user_info }
                    await post('/api/create', data, successCreate, fault)
                } else {
                    create(CreateRandomRoom, {
                        visible: true,
                        params: data,
                        success: successCreate,
                        fault: fault,
                    })
                }
            } catch (error) {
                $message.error(error.message)
            }

            function successCreate(data) {
                const params = {
                    user_info: {
                        user_id: user_id,
                        user_name: user_name.value,
                    },
                    room_No: data.room_No,
                    room_info: data.room_info,
                }

                store.dispatch('successEnter', params)
                setCookie('token', data.token)
                router.push({ path: '/chat' })
            }
            //通用的错误回调函数
            // function fault(error) {
            //     $message.error(error.message)
            // }
        }

        // const test = ref(0)
        // watchEffect(() => {
        //     console.log(`${test.value}hook`)
        // })

        return { room_No, user_name, createRoom, enterRoom, t }
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
    .enter_header,
    .enter_footer {
        display: none;
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
</style>
