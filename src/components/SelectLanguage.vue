<template>
    <div class="select_language">
        <a-radio-group v-model:value="locale">
            <a-radio value="cn">
                {{ t('label.global.L001') }}
            </a-radio>
            <a-radio value="en">
                {{ t('label.global.L002') }}
            </a-radio>
        </a-radio-group>
    </div>
</template>

<script>
import { ref, reactive, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { setCookie } from '../utils/cookie.js'
export default {
    setup(props, context) {
        const { t, locale } = useI18n()
        //这里以后要修改成从cookie中获取

        watchEffect(() => {
            setCookie('lang', locale.value)
        })
        // function onChange(e) {
        //     locale.value = select_language.value;
        // }

        return { locale, t }
    },
}
</script>

<style lang="css" scoped>
.select_language {
    display: flex;
    justify-content: center;
    align-items: center;
}
.select_language ::v-deep(.ant-select-selection) {
    border: none;
}
</style>
