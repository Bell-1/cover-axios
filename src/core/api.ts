import type { Api, Method } from '../../types'
/**
 * 添加api接口
 * @param apiName 	接口名称
 * @param url 		接口地址
 * @param method 	请求方式
 * @param meta		可存储任意数据供开发时使用
 */
export function genApi(apiName: string, url: string, method: Method | undefined, meta?: any): Api {
	const api: Api = {
		apiName,
		method,
		url,
	}

	const params = url.match(/:\w+/g); // 查找URL中的 [:param] 

	if (params) {
		api.params = params;
	}

	if (meta) {
		api.meta = meta;
	}

	return api;
}