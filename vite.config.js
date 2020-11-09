// vite.config.js
export default {
    proxy: {
        // with options
        '/api': {
            target: 'http://localhost:3010',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
}