<template>
    <div class="chat_slide">
        <template v-if="store.getters.room_info.users.length">
            <user-info
                v-for="(user, index) in store.getters.room_info.users"
                :key="index"
                :user_name="user.user_name"
                :user_id="user.user_id"
            ></user-info>
        </template>
    </div>
</template>

<script>
import { reactive } from "vue";
import UserInfo from "./UserInfo.vue";
import { useStore } from "vuex";
export default {
    components: {
        UserInfo,
    },
    setup() {
        const store = useStore();
        return { store };
    },
};
</script>

<style lang="css" scoped>
.chat_slide {
    overflow-x: hidden;
}
</style>
