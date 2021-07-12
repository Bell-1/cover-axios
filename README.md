# axios-vue-http

基于 axios 进行二次封装, 提供 vue 项目使用

## Install

Using npm:

```bash
$ npm install cover-axios
```

Using yarn:

```bash
$ yarn add cover-axios
```

## cover-axios api

```js
import HTTP, { genApi } from "cover-axios";

const http = new HTTP();
const api = genApi("login", "api/user/login", "POST");

http.addApi(api);

const res = await http.request("login", { user: "user1", password: 123456 });
```
