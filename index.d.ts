import { Http } from './src/core/http'

interface HttpInstance {
	install: (vue: any) => any,
	http: Http,
}

declare const Http: HttpInstance;

export default Http;