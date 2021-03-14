<template>
    <div class="z-button-container" :class="$attrs.class">
        <button
            class="z-button"
            v-bind:class="classObject"
            type="button"
            @click="$emit('click')"
        >
            <slot></slot>
        </button>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'default',
        },
    },
    setup(props) {
        const classObject = computed(() => {
            return {
                main: props.type && props.type === 'main',
                new: props.type && props.type === 'new',
            }
        })

        return { classObject }
    },
}
</script>

<style lang="css" scoped>
.main {
    background-color: #0099ff;
}
.new {
    background-color: orange;
}

.z-button {
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0px;
    border: 1px solid #dcdfe6;
}
</style>
