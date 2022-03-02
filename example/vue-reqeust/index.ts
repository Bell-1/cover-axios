import http, { setOptions } from 'cover-axios'
import ApiList from './api'

const coverCodes: Set<number> = new Set([]) // 用来覆盖错误弹框的错误码
const __DEV__ = true

if (__DEV__) {
	// 本地代理指向配置
	setOptions({ baseURL: '/serve' })
}

if (ApiList && Array.isArray(ApiList)) {
	// 添加接口列表
	http.addApiList(ApiList)
}

http.interceptors.request.use(requestIntercept, requestFail)
http.interceptors.response.use(responseIntercept, requestFail)

// 添加覆盖弹框 错误码
export function addCoverCode(code: number) {
	coverCodes.add(code)
}

// 添加了覆盖的错误码 不需要了可以删除
export function removeCoverCode(code: number | undefined) {
	if (!code) {
		coverCodes.clear()
	} else {
		coverCodes.delete(code)
	}
}

// 请求拦截 同axios
function requestIntercept(config: any) {
	return config
}

// 返回拦截 这里根据自己的项目 做了返回处理
// 错误会进行弹窗提示
function responseIntercept(res: any) {
	if (!res) return showMessage(res)
	const { data, code } = res.data
	if (code === 0) {
		return data
	} else {
		return showMessage(res.data)
	}
}

// 请求失败处理
function requestFail(err: any) {
	console.error('request fail', err)
	return Promise.reject(err)
}

// 错误弹窗 会通过coverCodes过滤是否使用弹框
function showMessage(data: { msg: string; code: number }) {
	if (data.code && !coverCodes.has(data.code)) {
		// 显示全局错误提示弹框
	}
	console.error('http error message:', data.msg || data)
	return Promise.reject(data.msg || data)
}
