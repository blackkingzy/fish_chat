<template>
    <div class="z-button-container">
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
import { computed } from "vue";
export default {
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: "default",
        },
    },
    setup(props) {
        const classObject = computed(() => {
            return { main: props.type && props.type === "main" };
        });

        return { classObject };
    },
};
</script>

<style lang="css" scoped>
.main {
    background-color: blue;
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