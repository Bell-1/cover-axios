import { Method, Api } from '../token';
/**
 * 添加api接口
 * @param apiName 	接口名称
 * @param url 		接口地址
 * @param method 	请求方式
 * @param meta		可存储任意数据供开发时使用
 */
export declare function genApi(apiName: string, url: string, method?: Method, meta?: Record<string, any>): Api;
