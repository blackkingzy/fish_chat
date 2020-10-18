<template>
    <el-dialog
        title="提示"
        v-model:visible="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
                >确 定</el-button
            >
        </span>
    </el-dialog>
</template>

<script>
import { ref } from "vue";
export default {
    setup() {
        const dialogVisible = ref(false);

        function open() {
            dialogVisible = true;
        }

        function close() {
            remove();
        }
        return { dialogVisible };
    },
};
</script>

<style lang="scss" scoped>
</style>