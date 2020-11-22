<template>
    <div class="z-input" v-bind:class="classObject">
        <label :for="$attrs.id" :style="{ width: labelWidth }"
            >{{ label }}:</label
        >
        <input
            maxlength="24"
            :value="modelValue"
            @input="onInput"
            ref="ZInput"
            type="text"
            v-bind="$attrs"
            :style="{ fontSize: type }"
        />
    </div>
</template>

<script>
import { computed } from "vue";
export default {
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: "default",
        },
        labelWidth: {
            type: String,
        },
        modelValue: String,
        label: String,
    },
    setup(props, context) {
        function onInput(e) {
            context.emit("update:modelValue", e.target.value);
            // 实时校验，通知父组件
            // this.parent.$emit("validate");
        }

        const classObject = computed(() => {
            return {
                large: props.type && props.type === "large",
                medium: props.type && props.type === "medium",
            };
        });
        return { onInput, classObject };
    },
};
</script>

<style lang="css" scoped>
.z-input {
    /* line-height: 2rem; */
    position: relative;
    margin-bottom: 2rem;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
}
.large {
    font-size: 2rem;
}
.medium {
    font-size: 1.5rem;
}
input {
    vertical-align: middle;
    font-size: large;
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
    color: #000;
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
