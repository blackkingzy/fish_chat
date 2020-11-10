/**
 * @param 要验证的值
 * @param 要验证的值对应的规则
 */
export const validate = (fields, rules) => {
    return new Promise((resolve, reject) => {
        let tip = ''
        for (let key in fields) {
            for (let rule of rules[key]) {
                //内部自定义规则都在此遍历
                //对于required规则的判断
                if (
                    rule.required && fields[key] instanceof Array
                        ? fields[key].length === 0
                        : !fields[key]
                ) {
                    tip = rule.message
                    break
                }
                //对于文章最少字符的判断
                // if (rule.min) {
                //     if (this.articleForm.content.length < rule.min) {
                //         this.$message.error(rule.message);
                //         hasError = true;
                //         break;
                //     }
                // }
            }
            if (tip) {
                break
            }
        }
        tip ? reject(new Error(tip)) : resolve()
    })
}
