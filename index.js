import Http from './src/core/http.js'
const http = new Http();

function install(vue) {
    vue.prototype.$http = http;
}

export default {
    install,
    http
}