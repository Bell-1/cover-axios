import * as __WEBPACK_EXTERNAL_MODULE_axios__ from "axios";
/******/ var __webpack_modules__ = ({

/***/ "./src/cover-axios.ts":
/*!****************************!*\
  !*** ./src/cover-axios.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setOptions": () => (/* binding */ setOptions),
/* harmony export */   "setBeforeRequest": () => (/* binding */ setBeforeRequest),
/* harmony export */   "getHeaders": () => (/* binding */ getHeaders),
/* harmony export */   "setHeaders": () => (/* binding */ setHeaders),
/* harmony export */   "removeHeaders": () => (/* binding */ removeHeaders),
/* harmony export */   "addApiList": () => (/* binding */ addApiList),
/* harmony export */   "apiMap": () => (/* binding */ apiMap),
/* harmony export */   "addApi": () => (/* binding */ addApi),
/* harmony export */   "getApi": () => (/* binding */ getApi),
/* harmony export */   "request": () => (/* binding */ request),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var _utils_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/path */ "./src/utils/path.ts");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version */ "./src/version.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var headers = function () {
  var _h = localStorage.getItem('requestHeadersCache');

  try {
    return _h ? JSON.parse(_h) : {};
  } catch (error) {
    return {};
  }
}();

var options = {
  timeout: 2500,
  baseURL: '/'
};
var instance = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create(); // 初始化

var interceptors = instance.interceptors;
var beforeRequestFn;
var setOptions = function setOptions() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  instance.defaults.timeout = options.timeout = opts.timeout || 2500;
  instance.defaults.baseURL = options.baseURL = opts.baseURL || '/';
  return options;
}; // 请求前验证

var setBeforeRequest = function setBeforeRequest(fn) {
  beforeRequestFn = fn;
}; // 获取当前存储的请求头

var getHeaders = function getHeaders() {
  return headers;
}; // 设置请求头

var setHeaders = function setHeaders(key, value) {
  if (!key || !value) return;
  headers[key] = value;
  localStorage.setItem('requestHeadersCache', JSON.stringify(headers));
  return headers;
}; // 移除请求头

var removeHeaders = function removeHeaders(key) {
  if (!key) return;
  delete headers[key];
  localStorage.setItem('requestHeadersCache', JSON.stringify(headers));
  return headers;
};
/**
 * 批量添加接口定义
 * @param apiList
 */

var addApiList = function addApiList(apiList) {
  var _iterator = _createForOfIteratorHelper(apiList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var v = _step.value;
      addApi(v);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
var apiMap = {};
/**
 * 添加单个接口
 * @param api
 */

var addApi = function addApi(api) {
  apiMap[api.apiName] = api;
};
/**
 * 获取api
 * @param {String} apiName
 */

var getApi = function getApi(apiName) {
  return apiMap[apiName];
};
var request = function request() {
  var apiName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var api = getApi(apiName);
  if (!api) return Promise.reject(new Error("\"(".concat(apiName, "\": The API does not exist")));

  var _addParamToUrl = (0,_utils_path__WEBPACK_IMPORTED_MODULE_1__.addParamToUrl)(api, param),
      url = _addParamToUrl.url,
      method = _addParamToUrl.method;

  var pass = beforeRequestFn ? beforeRequestFn(api) : true;
  if (pass === false) return Promise.reject("Request validation was't passed");
  return instance.request({
    url: (0,_utils_path__WEBPACK_IMPORTED_MODULE_1__.cleanPath)(url),
    method: method,
    headers: headers,
    data: data,
    params: api.method && api.method === 'GET' ? data : undefined
  });
};
var Http = {
  setOptions: setOptions,
  setBeforeRequest: setBeforeRequest,
  setHeaders: setHeaders,
  getHeaders: getHeaders,
  removeHeaders: removeHeaders,
  getApi: getApi,
  addApi: addApi,
  addApiList: addApiList,
  request: request,
  interceptors: interceptors,
  version: _version__WEBPACK_IMPORTED_MODULE_2__.version
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Http);

/***/ }),

/***/ "./src/utils/api.ts":
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genApi": () => (/* binding */ genApi)
/* harmony export */ });
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path */ "./src/utils/path.ts");

/**
 * 添加api接口
 * @param apiName 	接口名称
 * @param url 		接口地址
 * @param method 	请求方式
 * @param meta		可存储任意数据供开发时使用
 */

function genApi(apiName, url) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  var meta = arguments.length > 3 ? arguments[3] : undefined;
  var api = {
    apiName: apiName,
    method: method,
    url: (0,_path__WEBPACK_IMPORTED_MODULE_0__.cleanPath)('/' + url)
  };
  var params = url.match(/:\w+/g); // 查找URL中的 [:param]

  if (params) {
    api.params = params;
  }

  if (meta) {
    api.meta = meta;
  }

  return api;
}

/***/ }),

/***/ "./src/utils/path.ts":
/*!***************************!*\
  !*** ./src/utils/path.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanPath": () => (/* binding */ cleanPath),
/* harmony export */   "addParamToUrl": () => (/* binding */ addParamToUrl)
/* harmony export */ });
function cleanPath(path) {
  return path.replace(/\/\//g, '/');
} // 添加所有 [:param] 参数数据进url 中

function addParamToUrl(api, paramsData) {
  var apiData = JSON.parse(JSON.stringify(api));
  var params = apiData.params;
  if (!params || !paramsData) return apiData;

  if (paramsData.length !== params.length) {
    throw new Error("Bad request parameter. Please check it");
  }

  for (var k in params) {
    apiData.url = apiData.url.replace(params[k], paramsData[k]);
  }

  return apiData;
}

/***/ }),

/***/ "./src/version.ts":
/*!************************!*\
  !*** ./src/version.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
var version = '0.3.0';

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_axios__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addApi": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.addApi),
/* harmony export */   "addApiList": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.addApiList),
/* harmony export */   "apiMap": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.apiMap),
/* harmony export */   "getApi": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.getApi),
/* harmony export */   "getHeaders": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.getHeaders),
/* harmony export */   "removeHeaders": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.removeHeaders),
/* harmony export */   "request": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.request),
/* harmony export */   "setBeforeRequest": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.setBeforeRequest),
/* harmony export */   "setHeaders": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.setHeaders),
/* harmony export */   "setOptions": () => (/* reexport safe */ _cover_axios__WEBPACK_IMPORTED_MODULE_0__.setOptions),
/* harmony export */   "genApi": () => (/* reexport safe */ _utils_api__WEBPACK_IMPORTED_MODULE_1__.genApi),
/* harmony export */   "addParamToUrl": () => (/* reexport safe */ _utils_path__WEBPACK_IMPORTED_MODULE_2__.addParamToUrl),
/* harmony export */   "cleanPath": () => (/* reexport safe */ _utils_path__WEBPACK_IMPORTED_MODULE_2__.cleanPath),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cover_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cover-axios */ "./src/cover-axios.ts");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/api */ "./src/utils/api.ts");
/* harmony import */ var _utils_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/path */ "./src/utils/path.ts");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_cover_axios__WEBPACK_IMPORTED_MODULE_0__["default"]);
})();

var __webpack_exports__addApi = __webpack_exports__.addApi;
var __webpack_exports__addApiList = __webpack_exports__.addApiList;
var __webpack_exports__addParamToUrl = __webpack_exports__.addParamToUrl;
var __webpack_exports__apiMap = __webpack_exports__.apiMap;
var __webpack_exports__cleanPath = __webpack_exports__.cleanPath;
var __webpack_exports__default = __webpack_exports__["default"];
var __webpack_exports__genApi = __webpack_exports__.genApi;
var __webpack_exports__getApi = __webpack_exports__.getApi;
var __webpack_exports__getHeaders = __webpack_exports__.getHeaders;
var __webpack_exports__removeHeaders = __webpack_exports__.removeHeaders;
var __webpack_exports__request = __webpack_exports__.request;
var __webpack_exports__setBeforeRequest = __webpack_exports__.setBeforeRequest;
var __webpack_exports__setHeaders = __webpack_exports__.setHeaders;
var __webpack_exports__setOptions = __webpack_exports__.setOptions;
export { __webpack_exports__addApi as addApi, __webpack_exports__addApiList as addApiList, __webpack_exports__addParamToUrl as addParamToUrl, __webpack_exports__apiMap as apiMap, __webpack_exports__cleanPath as cleanPath, __webpack_exports__default as default, __webpack_exports__genApi as genApi, __webpack_exports__getApi as getApi, __webpack_exports__getHeaders as getHeaders, __webpack_exports__removeHeaders as removeHeaders, __webpack_exports__request as request, __webpack_exports__setBeforeRequest as setBeforeRequest, __webpack_exports__setHeaders as setHeaders, __webpack_exports__setOptions as setOptions };

//# sourceMappingURL=cover-axios.es.js.map