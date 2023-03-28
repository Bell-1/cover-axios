// 支持的方法
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

// api 类型
export type Api = {
	apiName: string
	method: Method | undefined
	url: string
	params?: string[]
	meta?: any
}

// http 配置
export type HttpOptions = {
	baseURL?: string
	debug?: boolean
	timeout?: number
}
