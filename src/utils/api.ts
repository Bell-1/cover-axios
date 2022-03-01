import CoverAxios, { Method } from '../../types'
import { cleanPath } from './path'

/**
 * 添加api接口
 * @param apiName 	接口名称
 * @param url 		接口地址
 * @param method 	请求方式
 * @param meta		可存储任意数据供开发时使用
 */
export function genApi(apiName: string, url: string, method: Method = 'GET', meta: string): CoverAxios.Api {
	const api: CoverAxios.Api = {
		apiName,
		method,
		url: cleanPath('/' + url),
	}

	const params = url.match(/:\w+/g) // 查找URL中的 [:param]

	if (params) {
		api.params = params
	}

	if (meta) {
		api.meta = meta
	}

	return api
}
