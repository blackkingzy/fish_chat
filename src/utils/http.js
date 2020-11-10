import request from './request'

const method = (httpMethod, special) => (
    url,
    data,
    onSuccess,
    onFault,
    headers
) => {
    return request({
        url: url,
        method: httpMethod,
        [httpMethod === 'post' ? 'data' : 'params']: data,
        headers,
    })
        .then((response) => {
            // handle success
            onSuccess ? onSuccess(response) : ''
            return response
        })
        .catch((error) => {
            // handle error
            onFault ? onFault(error) : ''
            if (special) {
                return Promise.reject(new Error(error.message || 'Error'))
            }
        })
}

export const get_special = method('get', true)
export const get = method('get')
export const post = method('post')
export const put = method('put')
export const del = method('delete')
