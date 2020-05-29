# axios-vue-http
基于axios进行二次封装, 提供vue项目使用


## 安装

> npm install -S axios-vue-http

## 使用

```js
import Http from 'axios-vue-http'
Vue.use(Http);
```


## example

```js
import Http from 'axios-vue-http'
Vue.use(Http);

const apiList = [
	{apiName: 'getTest', method: 'GET', url: 'api/test'},
	{apiName: 'postTest', method: 'POST', url: 'api/test'},
	{apiName: 'delTest', method: 'DELETE', url: 'api/test'},
	{apiName: 'putTest', method: 'PUT', url: 'api/test'},
]

function success(data, resolve, reject) {
	// 接口请求成功处理
  // responent.status === 200
  // data = responent.data
  // 处理自定义处理
  // 通过使用resolve()
  // 不通过使用reject()
  // 必须 调用 resolve | reject
}

function fail(data) {
	// 接口请求失败处理
  // responent.status !== 200
}


function genHeader() {
  let headers = {
    token: localStorage.getItem('token') || undefined,
  }
  return { headers };
}

const app = new Vue({
  beforeMount() {
    this.$http.addApiList(apiList); //设置接口列表
    this.$http.requestInterceptors(genHeader); //设置请求拦截器，添加headers token
    this.$http.setSuccess(success); //设置请求成功回调 
    this.$http.setFail(fail); //设置请求失败回调 
  },
  render: h => h(App),
});

app.$mount('#app');

```

### request
> request(apiName, data, param);  

|参数|描述 |
|-|-| -|
| apiName| 接口请求名称|
| data |接口发送数据  post中使用data, get中会拼到url中|
|param|url参数，例：request('getTest',{a:1}, '/123') ===> https://xxx.xxx.xxx/api/test/123?a=1|


```js
// 在页面中使用

	methods: {
		async getFetach(){
			try {
				const res = await this.$http.request('postTest', {p1: 1});
			}catch(err) {
				console.error('请求失败：', err)
			}
		},
	}


```


