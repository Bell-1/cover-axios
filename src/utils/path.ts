import type { Api } from '../../types'

export function cleanPath(path: string): string {
	return path.replace(/\/\//g, '/')
}

// 添加所有 [:param] 参数数据进url 中
export function addParamToUrl(api: Api, paramsData: string[]): Api {
	const apiData = { ...api };
	const { params } = apiData;

	if (!params || !paramsData) return apiData;

	if (paramsData.length !== params.length) {
		throw new Error(`Bad request parameter. Please check it`);
	}

	for (var k in params) {
		apiData.url = apiData.url.replace(params[k], paramsData[k])
	}

	return apiData;
}