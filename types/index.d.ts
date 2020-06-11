import Vue from 'vue'
import { Http } from './http'

declare module 'vue/types/vue' {
	interface Vue {
		$http: Http,
	}
}

interface HttpInstance {
	install: (vue: any) => any,
	http: Http,
}

declare const Http: HttpInstance;


export default Http;


