export declare type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'link' | 'LINK' | 'unlink' | 'UNLINK';
export declare type Api = {
    apiName: string;
    method: Method | undefined;
    url: string;
    params?: string[];
    meta?: any;
};
export declare type HttpOptions = {
    baseURL?: string;
    debug?: boolean;
    timeout?: number;
};
