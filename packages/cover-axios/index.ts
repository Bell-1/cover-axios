import CoverAxios from '../core/http'
import { version } from '../cover-axios/version'
export * from '../core/http'
export * from '../utils/api'
export * from '../utils/path'
export * from '../utils/file'

export { version }

export default {
	...CoverAxios,
	version,
}
