import axios, { AxiosInstance } from 'axios'

let headers = localStorage.getItem('requestHeadersCache');

export default class CoverHTTP {
	private baseURL: string;
	private apiMap: CoverHTTP.ApiMap = {};//接口列表
	private instance: AxiosInstance;
	private headers: any;

	interceptors: any;

	constructor(opts?: CoverHTTP.HttpOptions) {

		this.baseURL = '';
		this.apiMap = {}
		this.headers = headers ? JSON.parse(headers) : {}; //headers

		const instance = this.instance = axios.create();  // 初始化
		instance.defaults.timeout = opts?.timeout || 2500;
		this.interceptors = instance.interceptors;

		if (opts?.baseURL) {
			this.setBaseURL(opts.baseURL)
		}

	}

	// 设置请求baseURL
	setBaseURL(url: string): void {
		this.baseURL = url;
		this.instance.defaults.baseURL = this.baseURL;
	}

	// 设置请求头
	setHeaders(key: string, value: string): any {
		if (!key || !value) return;
		this.headers[key] = value;
		localStorage.setItem('requestHeadersCache', JSON.stringify({ ...this.headers }));
		return this.headers;
	}

	// 移除请求头
	removeHeaders(key: string): void {
		if (!key) return;
		delete this.headers[key];
		localStorage.setItem('requestHeadersCache', JSON.stringify(this.headers));
		return this.headers;
	}

	/**
	 * 批量添加接口定义
	 * @param apiList 
	 */
	addApiList(apiList: CoverHTTP.Api[]): void {
		for (let v of apiList) {
			this.addApi(v)
		}
	}

	/**
	 * 添加单个接口
	 * @param api 
	 */
	addApi(api: CoverHTTP.Api): void {
		this.apiMap[api.apiName] = api;
	}

	/**
	 * 获取api
	 * @param {String} apiName
	 */
	getApi(apiName: string): CoverHTTP.Api | undefined {
		return this.apiMap[apiName] ? this.apiMap[apiName] : undefined;
	}

	// 添加所有 [:param] 参数数据进url 中
	addParamToUrl(api: CoverHTTP.Api, paramsData: string[]): CoverHTTP.Api {
		const apiData = { ...api };
		const { params, url } = apiData;

		if (!params || !paramsData) return apiData;

		if (paramsData.length !== params.length) {
			throw new Error(`Bad request parameter. Please check it`);
		}

		for (var k in params) {
			apiData.url = url.replace(params[k], paramsData[k])
		}

		return apiData;
	}

	/**
	 * 请求查询
	 * @param {String} apiName 接口名称定义在apiList
	 * @param {Object} data 传送数据
	 * @param {String} param url参数
	 */
	request(apiName = "", data = {}, param: string[] = []): Promise<any> {
		let api = this.getApi(apiName);
		if (!api) return Promise.reject(new Error(`"(${apiName}": The API does not exist`));

		const { url, method } = this.addParamToUrl(api, param);

		return this.instance.request({
			url,
			method,
			data,
			params: api.method?.toUpperCase() === 'GET' ? data : undefined,
			headers: {
				...this.headers,
			},
		});
	}

}