import type { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios'

export type Method =
	| 'get'
	| 'GET'
	| 'delete'
	| 'DELETE'
	| 'head'
	| 'HEAD'
	| 'options'
	| 'OPTIONS'
	| 'post'
	| 'POST'
	| 'put'
	| 'PUT'
	| 'patch'
	| 'PATCH'
	| 'link'
	| 'LINK'
	| 'unlink'
	| 'UNLINK'

export type Api = {
	apiName: string
	method: Method | undefined
	url: string
	params?: string[]
	meta?: any
}

export type HttpOptions = {
	baseURL?: string
	debug?: boolean
	timeout?: number
}
export function setOptions(opts: Partial<HttpOptions> = {}): HttpOptions

export function getHeaders(key: string, value: string): any

export function setHeaders(key: string, value: string): any

export function removeHeaders(key: string): any

export function addApiList(apiList: Api[]): void

export function addApi(api: Api): void

export function getApi(apiName: string): Api | undefined

export function addParamToUrl(api: Api, paramsData: string[]): Api

export function genApi(apiName: string, url: string, method?: Method, meta?: any): Api

export function beforeRequestFn(api: Api): boolean

export function request<T>(apiName: string, data: any, param?: string[], isDownload?: boolean): Promise<T>

export function saveFile(blobData: any, fileType: string, fileName?: string): void

declare const _default: {
	setOptions: typeof setOptions
	setBeforeRequest: (fn: typeof setOptions) => HttpOptions
	setHeaders: typeof setHeaders
	getHeaders: typeof getHeaders
	removeHeaders: typeof removeHeaders
	getApi: typeof getApi
	addApi: typeof addApi
	addApiList: typeof addApiList
	request: typeof request
	interceptors: {
		request: AxiosInterceptorManager<AxiosRequestConfig>
		response: AxiosInterceptorManager<AxiosResponse>
	},
	version: string,
}

export default _default
