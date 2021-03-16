import { Modal } from 'ant-design-vue'
import { h } from 'vue'
import Input from '../../../components/ZInput.vue'
import { message } from 'ant-design-vue'
import { isEmpty } from '../../../utils/index.js'

//尝试写函数组件
export default (t, showTip) => {
    let password = ''
    showTip = showTip === false ? showTip : true
    return new Promise((resolve, reject) => {
        Modal.confirm({
            title: t('label.enter.L006'),
            content: h('div', {}, [
                h(Input, {
                    modelValue: password,
                    size: 'small',
                    type: 'password',
                    label: t('label.enter.L007'),
                    labelWidth: '6em',
                    oninput: function (e) {
                        password = e.target.value
                    },
                }),
                showTip ? t('message.enter.M004') : '',
            ]),
            centered: true,
            okText: t('label.global.L003'),
            cancelText: t('label.global.L004'),
            onOk(close) {
                //enter下,必须要填密码的情况
                if (!showTip && isEmpty(password)) {
                    message.error(t('message.enter.M005'))
                } else {
                    resolve(password)
                    close()
                }
            },
            onCancel() {
                reject()
            },
            class: 'input_password',
            maskClosable: true,
            keyboard: true,
        })
    })
}
