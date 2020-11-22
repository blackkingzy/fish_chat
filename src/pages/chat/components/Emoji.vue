<template>
    <div class="emoji">
        <a-popover
            v-model:visible="visible"
            :title="t('label.chat.L006')"
            trigger="click"
            placement="topLeft"
        >
            <template #content>
                <div class="emoji_content">
                    <span
                        v-for="(emoji, index) in emojiList"
                        :key="index"
                        @click.passive="select"
                        >{{ emoji }}</span
                    >
                </div>
            </template>
            <img class="emoji_mark" src="../../../assets/emoji.png" />
        </a-popover>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default {
    setup(props, context) {
        const { t } = useI18n()
        const emojiList = [
            '😃',
            '😂',
            '😅',
            '😆',
            '😉',
            '😊',
            '😎',
            '😍',
            '😘',
            '😗',
            '😏',
            '😝',
            '😓',
            '😷',
            '😤',
            '😭',
            '😱',
            '😡',
            '😠',
            '💪',
            '👌',
            '👍',
            '👎',
            '✊',
            '👊',
            '👏',
            '🙏',
        ]
        const visible = ref(false)
        function select(e) {
            visible.value = false
            context.emit('addEmoji', e.target.innerText)
        }
        return {
            visible,
            select,
            emojiList,
            t,
        }
    },
}
</script>

<style lang="css">
.emoji_mark {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 0.2rem 0.1rem 0.2rem;
    cursor: pointer;
}
.emoji_content {
    width: 16rem;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>
