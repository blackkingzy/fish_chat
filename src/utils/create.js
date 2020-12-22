import { createApp } from 'vue'
import antd from 'ant-design-vue'
import store from '../store/index.js'
import i18n from '../i18n/index.js'

// import store from '../store'
// import router from '../router'
// 创建一个create函数，可以动态生成组件实例，并且挂载到body上

// Component:是组件配置对象
export function create(Component, props) {
    //dialog实例
    let dialogInstance = null
    //创建一个临时div供将来挂载
    const div = document.createElement('div')
    document.body.appendChild(div)

    //声明销毁方法
    function destroy() {
        if (dialogInstance && div.parentNode) {
            console.log('destroy')
            dialogInstance.unmount(div)
            div.parentNode.removeChild(div)
            dialogInstance = null
        }
    }

    // 借用createApp来动态生成这个组件实例
    dialogInstance = createApp(
        Component,
        Object.assign(props, { destroy })
    ).use(store).use(i18n)

    //要将antd的组件注册给临时创建的app实例,这样新实例才能找到antd中的组件,在这边我只注册对话框组件
    //总结:注意这里也是实例,与main.js中的相同
    dialogInstance.use(antd)

    dialogInstance.mount(div) // 这个函数执行才会执行render函数

    return dialogInstance
}

//待解决问题
//mount之后在body下产生了俩个div,并且出现了teleport
