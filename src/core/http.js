import axios from 'axios'
const origin = window.location.origin;
const exportTypes = {
    xls: 'application/vnd.ms-excel,charset=UTF-8',
    xlsx: 'application/vnd.ms-excel,charset=UTF-8',
    csv: 'text/csv,charset=UTF-8',
}

class Http {
    constructor() {
        this._apiList = {} //接口列表
        this._success = undefined; //成功回调
        this._fail = undefined; //失败回调
    }

    /**
     * 请求拦截器 比如添加headers.token
     * @param {*} genConfigFn 
     */
    requestInterceptors(genConfigFn) {
        axios.interceptors.request.use(defaultConfig => {
            return Object.assign(defaultConfig, genConfigFn());
        }, error => {
            return Promise.reject(error);
        });
    }

    /**
     * 请求成功回调
     * @param {*} successCb 
     */
    setSuccess(successCb) {
        if (typeof successCb !== 'function') return;
        this._success = successCb;
    }
    /**
     * 请求失败回调
     * @param {*} successCb 
     */
    setFail(failCb) {
        if (typeof failCb !== 'function') return;
        this._fail = failCb;
    }

    /**
     * 接口列表
     * @param {*} apiList 
     */
    addApiList(apiList = []) {
        if (!Array.isArray(apiList)) return;
        for (let api of apiList) {
            this.addApi(api);
        }
    }
    /**
     * 添加接口
     * @param {Object} api 
     */
    addApi(api) {
        const { apiName, method, url, baseURL = origin } = api;
        if (apiName && method && url) {
            this._apiList[apiName] = {
                method: method.toUpperCase(),
                url,
                baseURL,
            };
        }
    }

    /**
     * 查找api
     * @param {String} apiName
     */
    findApi(apiName) {
        let api;
        return apiName && (api = this._apiList[apiName]) ? api : null
    }

    /**
     * 请求查询
     * @param {String} apiName 接口名称定义在apiList
     * @param {Object} data 传送数据
     * @param {String} param get参数
     */
    request(apiName = "", data = {}, param = '') {
        let api = this.findApi(apiName);
        if (!api) return Promise.reject(new Error('api not found!'));
        const { url, method, baseURL } = api;
        const reqConfig = {
            url: url + param,
            method,
            data,
            params: api.method === 'GET' ? data : undefined,
            baseURL,
        }
        const promise = new Promise(async (resolve, reject) => {
            try {
                let res = await axios.request(reqConfig);
                let { status, data } = res;
                if (status === 200) {
                    this._success ? this._success(data, resolve, reject) : resolve(data);
                } else {
                    this._fail ? this._fail(data, resolve, reject) : reject(data);
                }
            } catch (error) {
                reject(error);
            }
        })

        return promise;
    }

    /**
     * 
     * @param {*} apiName 
     * @param {*} data 
     * @param {*} options  fileName 文件名称  exportType 下载文件格式
     */
    downloadFile(apiName, data = {}, { fileName = '', exportType = 'csv' } = {}) {
        const fileType = exportTypes[exportType];
        const api = this.findApi(apiName);
        if (!api) return Promise.reject(new Error('api not found!'));
        const { url } = api;
        return new Promise(async (resolve, reject) => {
            if (!fileType) {
                reject();
                console.error('下载文件格式不正确')
                return
            }
            try {
                const res = await axios.request({
                    url,
                    method: 'POST',
                    responseType: 'blob', // 表明返回服务器返回的数据类型
                    data,
                })
                const type = res.headers['content-type'];
                let blob = new Blob([res.data], { type })
                fileName = `${fileName}${+new Date()}.${exportType}`
                let navigator = window.navigator;
                if (navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName)
                } else {
                    var link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = fileName;
                    link.click()
                    //释放内存
                    window.URL.revokeObjectURL(link.href)
                }
                resolve();
            } catch (error) {
                reject();
                console.error('接口请求失败！', error);
            }
        })
    }
}

export default Http;