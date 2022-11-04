import { HttpOptions, Api } from '../../types'
import axios from 'axios'
import { cleanPath, addParamToUrl } from '../utils/path'

const headers = ((): Record<string, string> => {
	const _h = localStorage.getItem('requestHeadersCache')
	try {
		return _h ? JSON.parse(_h) : {}
	} catch (error) {
		return {}
	}
})()

const options = {
	timeout: 2500,
	baseURL: '/',
}

const instance = axios.create() // 初始化
const interceptors = instance.interceptors
let beforeRequestFn: (api: Api) => boolean

export const setOptions = (opts: Partial<HttpOptions> = {}) => {
	instance.defaults.timeout = options.timeout = opts.timeout || 2500
	instance.defaults.baseURL = options.baseURL = opts.baseURL || '/'
	return options
}

// 请求前验证
export const setBeforeRequest = (fn: (api: Api) => boolean) => {
	beforeRequestFn = fn
}

// 获取当前存储的请求头
export const getHeaders = () => headers
// 设置请求头
export const setHeaders = (key: string, value: string) => {
	if (!key || !value) return
	headers[key] = value
	localStorage.setItem('requestHeadersCache', JSON.stringify(headers))
	return headers
}

// 移除请求头
export const removeHeaders = (key: string) => {
	if (!key) return
	delete headers[key]
	localStorage.setItem('requestHeadersCache', JSON.stringify(headers))
	return headers
}

/**
 * 批量添加接口定义
 * @param apiList
 */
export const addApiList = (apiList: Api[]) => {
	for (let v of apiList) {
		addApi(v)
	}
}
export const apiMap: Record<string, Api> = {}
/**
 * 添加单个接口
 * @param api
 */
export function addApi (api: Api) {
	apiMap[api.apiName] = api
}

/**
 * 获取api
 * @param {String} apiName
 */
export function getApi (apiName: string) {
	return apiMap[apiName]
}

export function request<R = any> (apiName: string, data: any = {}, param: string[] = [], isDownload?: boolean){
	let api = getApi(apiName)
	if (!api) return Promise.reject(new Error(`"(${apiName}": The API does not exist`))

	const { url, method } = addParamToUrl(api, param)

	const pass = beforeRequestFn ? beforeRequestFn(api) : true

	if (!pass) return Promise.reject(`Request validation was't passed`)

	const options: Record<string, any> = {
		url: cleanPath(url),
		method,
		headers,
		data,
		params: api.method && api.method === 'GET' ? data : undefined,
	}
	if (api.meta?.download === true || isDownload === true) {
		// 表明返回服务器返回的数据类型 是blob文件
		options.responseType = 'blob'
	}

	return instance.request<R , R>(options)
}

const Http = {
	setOptions,
	setBeforeRequest,
	setHeaders,
	getHeaders,
	removeHeaders,
	getApi,
	addApi,
	addApiList,
	request,
	interceptors,
}

export default Http
