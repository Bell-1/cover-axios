import { Method, Api } from '../../types'
import { cleanPath } from './path'

/**
 * 添加api接口
 * @param apiName 	接口名称
 * @param url 		接口地址
 * @param method 	请求方式
 * @param meta		可存储任意数据供开发时使用
 */
export function genApi(apiName: string, url: string, method: Method = 'GET', meta?: Record<string, any>): Api {
	const api: Api = {
		apiName,
		method,
		url: cleanPath('/' + url),
		params: url.match(/:\w+/g) || undefined, // 查找URL中的 [:param]
		meta,
	}

	return api
}
