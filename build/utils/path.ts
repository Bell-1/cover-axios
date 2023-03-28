import path from 'path'

// 主目录 
export const mainPath = path.resolve(__dirname, '../..')
// 主入口
export const entryPath = path.resolve(mainPath, 'packages/cover-axios/index.ts')
// 打包输出目录
export const outputPath = path.resolve(mainPath, 'lib')
// tsconfig
export const tsconfigPath = path.resolve(mainPath, 'tsconfig.json')