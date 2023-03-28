import { HttpOptions, Api, Method } from '../token'
import axios from 'axios'
import { cleanPath } from '../utils/path'

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
	if (!key || !value) return headers
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
	for (const v of apiList) {
		addApi(v)
	}
}
export const apiMap: Record<string, Api> = {}
/**
 * 添加单个接口
 * @param api
 */
export function addApi(api: Api) {
	apiMap[api.apiName] = api
}

/**
 * 获取api
 * @param {String} apiName
 */
export function getApi(apiName: string) {
	return apiMap[apiName]
}

// 判断是否有协议
export function hasProtocol(url: string) {
	return /^https?:\/\//.test(url)
}

// 添加本地协议
export function addProtocol(url: string) {
	return hasProtocol(url) ? url : `${location.origin}/${url}`
}

// 简单处理url内携带的参数
function parseUrlWithQuery(urlString: string) {
	const url = new URL(addProtocol(cleanPath(urlString)))
	const query = Object.fromEntries(url.searchParams.entries())
	return { url: url.pathname, query }
}

export function request<R = unknown>(
	_url: string,
	data: Record<string, unknown> = {},
	params: Record<string, unknown> = {},
	_method?: Method,
	isDownload?: boolean
) {
	if (!_url) return Promise.reject(new Error(`The API does not exist, get apiUrl is ${_url}`))
	// 如果是定义的方式使用
	const api = getApi(_url)
	const { url, query } = parseUrlWithQuery(_url)
	const method = api ? api.method : _method

	// 请求前验证
	if (api) {
		const pass = beforeRequestFn ? beforeRequestFn(api) : true
		if (!pass) return Promise.reject(`Request validation was't passed`)
	}

	params = {
		...params,
		...(method === 'get' ? data : {}),
		...query,
	}

	const options: Record<string, unknown> = {
		url,
		method,
		headers,
		data,
		params,
	}
	if (api.meta?.download === true || isDownload === true) {
		// 表明返回服务器返回的数据类型 是blob文件
		options.responseType = 'blob'
	}

	return instance.request<R, R>(options)
}

function get(url:string, params: Record<string, unknown>) {
	request(url, params, {}, 'GET')
}

function post(url:string, data: Record<string, unknown>, params: Record<string, unknown>) {
	request(url, data, params, 'POST')
}

function put(url:string, data: Record<string, unknown>, params: Record<string, unknown>) {
	request(url, data, params, 'PUT')
}

function del(url:string, data: Record<string, unknown>, params: Record<string, unknown>) {
	request(url, data, params, 'DELETE')
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
	instance,
	interceptors,
	get,
	post,
	put,
	del,
}

export default Http
