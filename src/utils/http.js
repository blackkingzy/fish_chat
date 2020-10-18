import request from "./request"


const method_data = (httpMethod) => (url, data, onSuccess, onFault, headers) => {
    return request({
        url: url,
        method: httpMethod,
        data,
        headers
    }).then(response => {
        // handle success
        onSuccess(response.data)
    })
        .catch(error => {
            // handle error
            onFault(error)
        })
}

const method_params = (httpMethod) => (url, params, onSuccess, onFault, headers) => {
    return request({
        url: url,
        method: httpMethod,
        params,
        headers
    }).then(response => {
        // handle success
        onSuccess(response.data)
    })
        .catch(error => {
            // handle error
            onFault(error)
        })
}

export const get = method_params('get')
export const post = method_data('post')
export const put = method_params('put')
export const del = method_params('delete')