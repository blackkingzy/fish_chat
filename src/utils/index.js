import { getCookie } from "./cookie.js"

export function isEmpty(value) {
    value = value.replace(/\s+/g, "");
    if (!value) {
        return true
    }
    return false
}

/**
 * 获取时间差并格式化
 * @param last,next 类型:date
 */
export const getTimeDiff = (last, next) => {

    const lang = getCookie('lang')

    //首先向下取整,然后提取一个格式化共同函数
    const diff = next.getTime() - last.getTime()

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff / (60 * 60 * 1000) - days * 24));
    const mins = Math.floor(((diff / (60 * 1000)) - days * 24 * 60 - hours * 60));
    const secs = Math.floor((diff / 1000 - days * 24 * 60 * 60 - hours * 60 * 60 - mins * 60));

    if (lang === 'en') {
        return `${days}days${hours}hours${mins}mins${secs}s`
    }
    return `${days}天${hours}小时${mins}分钟${secs}秒`
}