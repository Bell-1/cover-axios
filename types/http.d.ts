declare namespace CoverHTTP {

	interface HttpOptions {
		baseURL?: string,
		debug?: boolean,
		timeout?: number,
	}
	type Method =
		| 'get' | 'GET'
		| 'delete' | 'DELETE'
		| 'head' | 'HEAD'
		| 'options' | 'OPTIONS'
		| 'post' | 'POST'
		| 'put' | 'PUT'
		| 'patch' | 'PATCH'
		| 'link' | 'LINK'
		| 'unlink' | 'UNLINK';

	interface Api {
		apiName: string,
		method: Method | undefined,
		url: string,
		params?: string[],
		meta?: any;
	}

	interface ApiMap {
		[prop: string]: Api
	}

	interface HttpOptions {
		baseURL?: string,
		debug?: boolean,
		timeout?: number,
	}

	declare function setBaseURL(url: string): void
	declare function setHeaders(key: string, value: string): any
	declare function removeHeaders(key: string): any
	declare function addApiList(apiList: Api[]): void
	declare function addApi(api: Api): void
	declare function getApi(apiName: string): Api | undefined
	declare function addParamToUrl(api: CoverHTTP.Api, paramsData: string[]): Api
	declare function request(apiName: string, data: any, param: string[] | undefined): Promise<any>
}
