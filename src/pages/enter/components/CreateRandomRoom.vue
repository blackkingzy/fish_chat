<template>
    <a-modal
        v-model:visible="dialogVisible"
        okText="confirm"
        title="Create room"
        @ok="createRoom"
        centered
        :afterClose="destroy"
    >
        Because there is no room number entered, do you want the system to
        automatically generate a room? (The room number is random)
    </a-modal>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { post } from '../../../utils/http'
import { router } from '../../../router'

export default {
    props: ['visible', 'destroy', 'params', 'success', 'fault'],
    setup(props, content) {
        const dialogVisible = ref(props.visible)

        function createRoom() {
            post(
                '/api/create',
                props.params,
                (data) => {
                    props.success(data)
                    dialogVisible.value = false
                },
                props.fault
            )
        }

        return {
            dialogVisible,
            createRoom,
        }
    },
}
</script>

<style lang="css" scoped></style>
