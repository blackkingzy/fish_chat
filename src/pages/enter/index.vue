<template>
    <div class="enter">
        <z-input
            id="room"
            v-model="room_No"
            label="请输入房间号"
            placeholder="Please enter the room NO"
            type="large"
            labelWidth="7em"
        ></z-input>
        <z-input
            id="user_name"
            v-model="user_name"
            label="请输入昵称"
            placeholder="Please enter the name"
            type="large"
            labelWidth="7em"
        ></z-input>
        <div class="enter_button">
            <z-button @click="createRoom" type="new" class="create_button"
                >create</z-button
            >
            <z-button @click="enterRoom" type="main" class="create_button"
                >Enter</z-button
            >
        </div>
    </div>
</template>

<script>
import ZInput from '../../components/ZInput.vue'
import ZButton from '../../components/ZButton.vue'
import { reactive, watchEffect, ref } from 'vue'
import { router } from '../../router'
import { get, post } from '../../utils/http'
import { create } from '../../utils/create'
import CreateRoom from '../create/index.vue'
import short from 'short-uuid'
import { setToken } from '../../utils/auth'
import { useStore } from 'vuex'
export default {
    components: {
        ZInput,
        ZButton,
    },
    setup() {
        const store = useStore()

        const room_No = ref('')
        const user_name = ref('')
        let user_id = ''

        function enterRoom() {
            console.log('请求进入房间')
            user_id = short.generate()
            const user_info = { user_id: user_id, user_name: user_name.value }
            const data = { room_No: room_No.value, user_info }
            post('/api/enter', data, successEnter, faultEnter)
        }

        function createRoom() {
            create(CreateRoom, {
                visible: true,
            })
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
            setToken(data.token)
            router.push({ path: '/chat' })
        }

        function faultEnter(error) {
            console.log(error)
        }

        const test = ref(0)
        watchEffect(() => {
            console.log(`${test.value}hook`)
        })

        return { room_No, user_name, createRoom, enterRoom }
    },
}
</script>

<style lang="css" scoped>
.enter {
    width: 465px;
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

.select_avator span:first-child {
    width: 7em;
    font-size: 2rem;
    color: rgb(0, 0, 0);
    font-weight: 700;
    text-align: justify;
    display: inline-block;
}
</style>
