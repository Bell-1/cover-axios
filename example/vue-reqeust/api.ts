import { genApi } from 'cover-axios'

const ApiList: CoverHTTP.Api[] = [
	// 账户
	genApi('login', 'api/v1/user/login', 'POST'), // 登录
	genApi('userInfo', '/api/v1/user/:userId', 'GET'), // 用户信息
]

export default ApiList;
