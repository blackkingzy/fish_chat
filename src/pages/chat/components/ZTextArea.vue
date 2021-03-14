<template>
    <div class="z-textarea">
        <textarea
            @keyup.ctrl.enter="$emit('enter')"
            v-bind="$attrs"
            :value="modelValue"
            ref="ZTextAreaDom"
            name="z_textarea"
            id="z_textarea"
            @input="onInput"
        ></textarea>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: ['modelValue'],
    setup(props, context) {
        function onInput(e) {
            context.emit('update:modelValue', e.target.value)
            // 实时校验，通知父组件
            // this.parent.$emit("validate");
        }
        return { onInput }
    },
}
</script>

<style lang="css" scoped>
.z-textarea {
    height: 100%;
}
textarea {
    resize: none;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-family: sans-serif;
    border: 1px solid #ebeef5;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
textarea:focus {
    outline: none;
    border-color: #409eff;
}
</style>
