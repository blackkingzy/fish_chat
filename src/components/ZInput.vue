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
            :type="type"
            v-bind="$attrs"
            :style="{ fontSize: size }"
        />
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'text',
        },
        size: {
            type: String,
            default: 'default',
        },
        labelWidth: {
            type: String,
        },
        modelValue: String,
        label: String,
    },
    setup(props, context) {
        function onInput(e) {
            //去除空格,这样写其实本质上空格输入了,但紧接着被替换了
            e.target.value = e.target.value.replace(/\s+/g, '')
            context.emit('update:modelValue', e.target.value)
            // 实时校验，通知父组件
            // this.parent.$emit("validate");
        }

        const classObject = computed(() => {
            return {
                large: props.size && props.size === 'large',
                medium: props.size && props.size === 'medium',
                medium: props.size && props.size === 'small',
            }
        })

        return { onInput, classObject }
    },
}
</script>

<style lang="css" scoped>
.z-input {
    /* line-height: 2rem; */
    position: relative;
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
