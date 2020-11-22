<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
    <!-- <select-language></select-language> -->
    <router-view></router-view>
    <!-- <router-link to='/chat'>goto chat</router-link> -->
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import SelectLanguage from "./components/SelectLanguage.vue";

export default {
    name: "App",
    components: {
        HelloWorld,
        SelectLanguage,
    },
};
</script>
