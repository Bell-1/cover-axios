import type { AxiosInstance } from 'axios'

export interface HttpOptions {
	baseURL?: string,
	debug?: boolean,
	timeout?: number,
}
export type Method =
	| 'get' | 'GET'
	| 'delete' | 'DELETE'

	| 'head' | 'HEAD'
	| 'options' | 'OPTIONS'
	| 'post' | 'POST'
	| 'put' | 'PUT'
	| 'patch' | 'PATCH'
	| 'link' | 'LINK'
	| 'unlink' | 'UNLINK';

export interface Api {
	apiName: string,
	method: Method | undefined,
	url: string,
	params?: string[],
	meta?: any;
}

export interface ApiMap {
	[prop: string]: Api
}

export interface HttpOptions {
	baseURL?: string,
	debug?: boolean,
	timeout?: number,
}

export interface SetBaseURL {
	(url: string): void
}
export interface SetHeaders {
	(key: string, value: string): any
}
export interface RemoveHeaders {
	(key: string): any
}
export interface AddApiList {
	(apiList: Api[]): void
}
export interface AddApi {
	(api: Api): void
}
export interface GetApi {
	(apiName: string): Api | undefined
}
export interface AddParamToUrl {
	(api: Api, paramsData: string[]): Api
}
export interface Request {
	(apiName: string, data?: any, param?: string[] | undefined): Promise<any>
}

// export interface genApi {
// 	(apiName: string, url: string, method: Method | undefined, meta?: any): Api
// }

export declare const genApi = (apiName: string, url: string, method: Method | undefined, meta?: any) => Api

export interface BeforeRequestFn {
	(api: Api): boolean
}

declare class CoverHTTP {
	constructor(someParam?: HttpOptions);

	private baseURL: string
	private _headers: any
	private apiMap: ApiMap//接口列表
	private instance: AxiosInstance
	private beforeRequestFn: BeforeRequestFn
	public interceptors: any
	public headers: any
	beforeRequest: (fn: BeforeRequestFn) => void
	setBaseURL: SetBaseURL
	setHeaders: SetHeaders
	removeHeaders: RemoveHeaders
	addApiList: AddApiList
	addApi: AddApi
	getApi: GetApi
	addParamToUrl: AddParamToUrl
	request: Request
}


export default CoverHTTP