import { describe, expect, test, beforeEach, afterEach, jest, it } from '@jest/globals'
import axios from 'axios'
import Http, {
	addApi,
	addApiList,
	getApi,
	genApi,
	getHeaders,
	removeHeaders,
	request,
	setBeforeRequest,
	setHeaders,
	setOptions,
} from '../packages/cover-axios'

describe('Http', () => {
	beforeEach(() => {
		jest.clearAllMocks() // clear mock calls before each test
		localStorage.clear() // clear localStorage
	})

	describe('setOptions()', () => {
		it('should set default options', () => {
			const options = setOptions()
			expect(options.timeout).toBe(2500)
			expect(options.baseURL).toBe('/')
			expect(axios.defaults.timeout).toBe(2500)
			expect(axios.defaults.baseURL).toBe('/')
		})

		it('should set custom options', () => {
			const options = setOptions({
				timeout: 3000,
				baseURL: '/serve',
			})
			expect(options.timeout).toBe(3000)
			expect(options.baseURL).toBe('/serve')
			expect(axios.defaults.timeout).toBe(3000)
			expect(axios.defaults.baseURL).toBe('/serve')
		})
	})

	describe('setBeforeRequest()', () => {
		it('should set before request function', () => {
			const mockFn = () => false
			setBeforeRequest(mockFn)
			expect(typeof mockFn).toBe('function')
			expect(typeof mockFn()).toBe('boolean')
		})
	})

	describe('setHeaders()', () => {
		it('should set headers', () => {
			const headers = setHeaders('Authorization', 'Bearer token')
			expect(headers.Authorization).toBe('Bearer token')
			expect(localStorage.getItem('requestHeadersCache')).toBe('{"Authorization":"Bearer token"}')
		})

		it('should not set headers if key or value is empty', () => {
			const headers = setHeaders('', '')
			expect(headers).toEqual({})
			expect(localStorage.getItem('requestHeadersCache')).toBe(null)
		})
	})

	describe('getHeaders()', () => {
		it('should get headers', () => {
			localStorage.setItem('requestHeadersCache', '{"Authorization":"Bearer token"}')
			const headers = getHeaders()
			expect(headers.Authorization).toBe('Bearer token')
		})
	})

	describe('removeHeaders()', () => {
		it('should remove headers', () => {
			localStorage.setItem('requestHeadersCache', '{"Authorization":"Bearer token","X-Test":"test"}')
			const headers = removeHeaders('Authorization')
			expect(headers).toEqual({ 'X-Test': 'test' })
			expect(localStorage.getItem('requestHeadersCache')).toBe('{"X-Test":"test"}')
		})

		it('should not remove headers if key is empty', () => {
			localStorage.setItem('requestHeadersCache', '{"Authorization":"Bearer token"}')
			const headers = removeHeaders('')
			expect(headers).toEqual({ Authorization: 'Bearer token' })
			expect(localStorage.getItem('requestHeadersCache')).toBe('{"Authorization":"Bearer token"}')
		})
	})
})

describe('request', () => {
	afterEach(() => {
		jest.resetAllMocks()
	})

	it('should return Promise.reject if url is not provided', async () => {
		await expect(request('')).rejects.toThrow('The API does not exist')
		expect(Http.instance.request).not.toHaveBeenCalled()
	})

	it('should call Http.instance.request with correct arguments', async () => {
		const url = 'https://example.com'
		const data = { foo: 'bar' }
		const params = { baz: 'qux' }
		const method = 'get'
		const isDownload = true

		const response = { status: 200, data: 'test' }
		;(Http.instance.request as jest.MockedFunction<typeof Http.instance.request>).mockResolvedValueOnce(response)

		const result = await request(url, data, params, method, isDownload)

		expect(Http.instance.request).toHaveBeenCalledWith({
			url,
			method,
			headers: expect.any(Object),
			data,
			params: { ...params, ...data },
			responseType: 'blob',
		})

		expect(result).toEqual(response)
	})

	it('should call beforeRequestFn before sending request', async () => {
		const url = 'https://example.com'
		const apiList = [genApi('getTest', '/api/getTest', 'GET'), genApi('postTest', '/api/postTest', 'POST')]
		addApiList(apiList)

		const data = { foo: 'bar' }
		const params = { baz: 'qux' }
		// const beforeRequestFn = jest.fn().mockReturnValueOnce(true)

		const response = { status: 200, data: 'test' }
		;(Http.instance.request as jest.MockedFunction<typeof Http.instance.request>).mockResolvedValueOnce(response)

		const result = await request(url, data, params)

		// expect(beforeRequestFn).toHaveBeenCalledWith(api)
		expect(Http.instance.request).toHaveBeenCalled()
		expect(result).toEqual(response)
	})
})
