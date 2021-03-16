// vite.config.js
// 只要在这里面修改端口,记得要去看store下的index.js中的端口是否需要修改
export default {
    base: './',
    proxy: {
        // with options
        '/api': {
            target: 'http://localhost:3010',  //可以直接定向到服务器，就不需要rewrite了
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
}