import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './router'
import vuex from './store/index.js'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(router).use(vuex).use(antd).mount('#app')
