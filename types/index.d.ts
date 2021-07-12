/// <reference path="./http.d.ts" />
/// <reference path="./api.d.ts" />

import Vue from 'vue'
import type { AxiosInstance } from 'axios'
export * from './api'
module 'vue/types/vue' {
	interface Vue {
		$http: CoreHTTP.CoverHTTP,
	}
}


export as namespace CoverHTTP;
export = CoverHTTP;

declare class CoverHTTP {
	constructor(someParam?: CoverHTTP.HttpOptions);

	private baseURL: string
	private headers: any
	private apiMap: CoverHTTP.ApiMap//接口列表
	private instance: AxiosInstance
	interceptors: any

	setBaseURL: CoverHTTP.setBaseURL
	setHeaders: CoverHTTP.setHeaders
	removeHeaders: CoverHTTP.removeHeaders
	addApiList: CoverHTTP.addApiList
	addApi: CoverHTTP.addApi
	getApi: CoverHTTP.getApi
	addParamToUrl: CoverHTTP.addParamToUrl
	request: CoverHTTP.request
	genApi: CoverHTTP.genApi
}

