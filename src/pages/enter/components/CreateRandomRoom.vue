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
        {{ t('message.enter.M003') }}
    </a-modal>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { post } from '../../../utils/http'
import { router } from '../../../router'
import { useI18n } from 'vue-i18n'
import inputpassword from './InputPassword.js'
import { message } from 'ant-design-vue'
export default {
    props: ['visible', 'destroy', 'params', 'success', 'fault'],
    setup(props, content) {
        const dialogVisible = ref(props.visible)
        const { t } = useI18n()

        async function createRoom() {
            try {
                dialogVisible.value = false
                props.params.room_info.room_password = await inputpassword(t)
                post(
                    '/api/create',
                    props.params,
                    (data) => {
                        props.success(data)
                    },
                    props.fault
                )
            } catch (error) {
                if (error) {
                    console.log(error)
                    $message.error(error.message)
                }
            }
        }

        return {
            dialogVisible,
            createRoom,
            t,
        }
    },
}
</script>

<style lang="css" scoped></style>
