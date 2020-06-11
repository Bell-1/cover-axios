export interface Api {
	apiName: string,
	method: string,
	url: string
	baseURL?: string
}

export interface Success { (data?: any, resolve?: any, reject?: any): void }
export interface Fail { (data?: any): void }
export interface genConfigFn { (): any }
export interface requestInterceptors { (genConfigFn: genConfigFn): void }
export interface setSuccess { (SuccessFn: Success): void }
export interface setFail { (failFn: Fail): void }
export interface addApiList { (apiList: Api[]): void }
export interface addApi { (api: Api): void }
export interface findApi { (apiName?: string): Api }
export interface request { (apiName?: string, data?: any, param?: any): any }
export interface downloadFile { (apiName?: string, data?: any, param?: any): any }

export interface Http {
	_apiList: Api[];
	_success: undefined | Success;
	_fail: undefined | Fail;
	requestInterceptors: requestInterceptors;
	setSuccess: setSuccess;
	setFail: setFail;
	addApiList: addApiList;
	addApi: addApi;
	findApi: findApi;
	request: request;
	downloadFile: downloadFile;
}
