<template>
    <div class="z-input">
        <label :for="$attrs.id">{{ $attrs.label }}:</label>
        <input
            maxlength="24"
            :value="modelValue"
            @input="onInput"
            ref="ZInput"
            type="text"
            v-bind="$attrs"
        />
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: ["modelValue"],
    setup(props, context) {
        function onInput(e) {
            console.log(this);
            context.emit("update:modelValue", e.target.value);
            // 实时校验，通知父组件
            // this.parent.$emit("validate");
        }
        return { onInput };
    },
};
</script>

<style lang="css" scoped>
.z-input {
    /* line-height: 2rem; */
    font-size: 2rem;
    position: relative;
    margin-bottom: 2rem;
}
input {
    vertical-align: middle;
    height: 2rem;
    border-radius: 4px;
    border: 2px solid #000000;
    padding: 0 0.5rem;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
input:focus {
    outline: none;
    border-color: #409eff;
}

label {
    /* font-size: 2rem; */
    width: 13rem;
    font-weight: 700;
    text-align: justify;
    display: inline-block;
    /* position: absolute; */
    /* left: -13.5rem; */
    /* line-height: 2rem; */
}

/* label::after {
    display: inline-block;
    width: 100%;
    content: "";
    height: 0;
} */
</style>
