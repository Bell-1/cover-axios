# cover-axios

基于 axios 进行二次封装, 支持 TS

## Install

Using npm:

```bash
$ npm i cover-axios
```

Using yarn:

```bash
$ yarn add cover-axios
```
Using pnpm:

```bash
$ pnpm i cover-axios
```

## Example

```js
import http, { genApi, addApi, addApiList, request } from 'cover-axios'

const api = genApi('login', 'api/user/login', 'POST')

http.addApi(api)
// or
http.addApiList([api])

const res = await http.request('login', { user: 'user1', password: 123456 })
const res = await request('login', { user: 'user1', password: 123456 })
```

## cover-axios API

Requests can be made by passing the relevant config to axios.

### interceptors 拦截器

延用 axios 的拦截器

```js
http.interceptors.request.use(requestIntercept, requestFail)
http.interceptors.response.use(responentIntercept, requestFail)
```
