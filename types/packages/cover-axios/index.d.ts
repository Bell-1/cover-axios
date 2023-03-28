import { version } from '../cover-axios/version';
export * from '../core/http';
export * from '../utils/api';
export * from '../utils/path';
export * from '../utils/file';
export { version };
declare const _default: {
    version: string;
    setOptions: (opts?: Partial<import("../token").HttpOptions>) => {
        timeout: number;
        baseURL: string;
    };
    setBeforeRequest: (fn: (api: import("../token").Api) => boolean) => void;
    setHeaders: (key: string, value: string) => Record<string, string>;
    getHeaders: () => Record<string, string>;
    removeHeaders: (key: string) => Record<string, string> | undefined;
    getApi: typeof import("../core/http").getApi;
    addApi: typeof import("../core/http").addApi;
    addApiList: (apiList: import("../token").Api[]) => void;
    request: typeof import("../core/http").request;
    instance: import("axios").AxiosInstance;
    interceptors: {
        request: import("axios").AxiosInterceptorManager<import("axios").AxiosRequestConfig<any>>;
        response: import("axios").AxiosInterceptorManager<import("axios").AxiosResponse<any, any>>;
    };
    get: (url: string, params: Record<string, unknown>) => void;
    post: (url: string, data: Record<string, unknown>, params: Record<string, unknown>) => void;
    put: (url: string, data: Record<string, unknown>, params: Record<string, unknown>) => void;
    del: (url: string, data: Record<string, unknown>, params: Record<string, unknown>) => void;
};
export default _default;
