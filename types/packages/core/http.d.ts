import { HttpOptions, Api, Method } from '../token';
export declare const setOptions: (opts?: Partial<HttpOptions>) => {
    timeout: number;
    baseURL: string;
};
export declare const setBeforeRequest: (fn: (api: Api) => boolean) => void;
export declare const getHeaders: () => Record<string, string>;
export declare const setHeaders: (key: string, value: string) => Record<string, string>;
export declare const removeHeaders: (key: string) => Record<string, string> | undefined;
/**
 * 批量添加接口定义
 * @param apiList
 */
export declare const addApiList: (apiList: Api[]) => void;
export declare const apiMap: Record<string, Api>;
/**
 * 添加单个接口
 * @param api
 */
export declare function addApi(api: Api): void;
/**
 * 获取api
 * @param {String} apiName
 */
export declare function getApi(apiName: string): Api;
export declare function hasProtocol(url: string): boolean;
export declare function addProtocol(url: string): string;
export declare function request<R = unknown>(_url: string, data?: Record<string, unknown>, params?: Record<string, unknown>, _method?: Method, isDownload?: boolean): Promise<R>;
declare function get(url: string, params: Record<string, unknown>): void;
declare function post(url: string, data: Record<string, unknown>, params: Record<string, unknown>): void;
declare function put(url: string, data: Record<string, unknown>, params: Record<string, unknown>): void;
declare function del(url: string, data: Record<string, unknown>, params: Record<string, unknown>): void;
declare const Http: {
    setOptions: (opts?: Partial<HttpOptions>) => {
        timeout: number;
        baseURL: string;
    };
    setBeforeRequest: (fn: (api: Api) => boolean) => void;
    setHeaders: (key: string, value: string) => Record<string, string>;
    getHeaders: () => Record<string, string>;
    removeHeaders: (key: string) => Record<string, string> | undefined;
    getApi: typeof getApi;
    addApi: typeof addApi;
    addApiList: (apiList: Api[]) => void;
    request: typeof request;
    instance: import("axios").AxiosInstance;
    interceptors: {
        request: import("axios").AxiosInterceptorManager<import("axios").AxiosRequestConfig<any>>;
        response: import("axios").AxiosInterceptorManager<import("axios").AxiosResponse<any, any>>;
    };
    get: typeof get;
    post: typeof post;
    put: typeof put;
    del: typeof del;
};
export default Http;
