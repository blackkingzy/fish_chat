import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './router'
import vuex from './store/index.js'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import i18n from './i18n/index.js'


const app = createApp(App)

app.use(router).use(vuex).use(antd).use(i18n).mount('#app')
