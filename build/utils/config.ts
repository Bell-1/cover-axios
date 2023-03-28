import pkgJson from '../../package.json'
export const extensions = ['.js', '.ts']
export const external = Object.keys(pkgJson.peerDependencies || {}) //['vue', 'vue', 'qs', 'dayjs']