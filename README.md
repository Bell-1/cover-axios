# axios-vue-http

基于 axios 进行二次封装, 支持TS

## Install

Using npm:

```bash
$ npm install cover-axios
```

Using yarn:

```bash
$ yarn add cover-axios
```

## Example

```js
import HTTP, { genApi } from "cover-axios";

const http = new HTTP();
const api = genApi("login", "api/user/login", "POST");

http.addApi(api);

const res = await http.request("login", { user: "user1", password: 123456 });
```
## cover-axios API

Requests can be made by passing the relevant config to axios.  

### interceptors 拦截器

延用axios的拦截器  

```js
http.interceptors.request.use(requestIntercept, requestFail)
http.interceptors.response.use(responentIntercept, requestFail)
```

### CoverAxios(config: HttpOptions)
> 实例化Http
### CoverAxios.setBaseURL(url: String)
> 设置baseUrl
### CoverAxios.setHeaders(key: String, value: String)
> 设置请求头
### CoverAxios.removeHeaders(key: Undefined | String)
> 移除请求头
### CoverAxios.addApiList(apiList: Array<Api>)
> 批量添加接口配置
### CoverAxios.addApi(api: Api)
> 添加单个接口配置
### CoverAxios.getApi(apiName: String)
> 查询单个接口信息
### CoverAxios.beforeRequest(fn: Function)
> 请求前拦截器（用于权限验证等，因request拦截器没法取到api相关信息）
### CoverAxios.request(apiName: String, data: Object, param: Array[])
> 接口请求