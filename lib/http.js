import axios, { AxiosInstance } from 'axios'
import { cleanPath, addParamToUrl } from '../utils/path'

let headers = localStorage.getItem('requestHeadersCache');

const noop = function() {};

export default class CoverHTTP {

    constructor(opts) {

        this.baseURL = '/';
        this.apiMap = {}
        this._headers = headers ? JSON.parse(headers) : {}; //headers

        const instance = this.instance = axios.create(); // 初始化
        instance.defaults.timeout = opts.timeout || 2500;
        this.interceptors = instance.interceptors;
        this.beforeRequestFn = noop;

        if (opts.baseURL) {
            this.setBaseURL(opts.baseURL)
        }

    }

    // 设置请求baseURL
    setBaseURL(url) {
        this.baseURL = url;
        this.instance.defaults.baseURL = this.baseURL;
    }

    // 设置请求头
    setHeaders(key, value) {
        if (!key || !value) return;
        this._headers[key] = value;
        localStorage.setItem('requestHeadersCache', JSON.stringify({ ...this._headers }));
        return this._headers;
    }

    // 获取当前存储的请求头
    get headers() {
        return this._headers;
    };

    // 移除请求头
    removeHeaders(key) {
        if (!key) return;
        delete this._headers[key];
        localStorage.setItem('requestHeadersCache', JSON.stringify(this._headers));
        return this._headers;
    }

    /**
     * 批量添加接口定义
     * @param apiList 
     */
    addApiList(apiList) {
        for (let v of apiList) {
            this.addApi(v)
        }
    }

    /**
     * 添加单个接口
     * @param api 
     */
    addApi(api) {
        this.apiMap[api.apiName] = api;
    }

    /**
     * 获取api
     * @param {String} apiName
     */
    getApi(apiName) {
        return this.apiMap[apiName];
    }



    // 请求验证验证
    beforeRequest(fn) {
        this.beforeRequestFn = fn;
    }

    /**
     * 请求查询
     * @param {String} apiName 接口名称定义在apiList
     * @param {Object} data 传送数据
     * @param {String} param url参数
     */
    request(apiName = "", data = {}, param = []) {
        let api = this.getApi(apiName);
        if (!api) return Promise.reject(new Error(`"(${apiName}": The API does not exist`));

        const { url, method } = addParamToUrl(api, param);

        const pass = this.beforeRequestFn(api);
        if (!pass) return Promise.reject(`Request validation was't passed`);

        return this.instance.request({
            url: cleanPath(url),
            method,
            data,
            params: api.method && api.method === 'GET' ? data : undefined,
            headers: {
                ...this._headers,
            },
        });
    }
}