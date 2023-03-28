module.exports = {
	// 指定要测试的文件路径模式
	testMatch: ['**/__tests__/**/*.[tj]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

	// 指定测试文件的环境
	testEnvironment: 'node',

	// 指定在运行测试之前需要执行的模块
	setupFilesAfterEnv: ['./jest/setupTests.ts'],
	setupFiles: ['jest-localstorage-mock'],

	// 指定覆盖率报告的格式和输出目录
	coverageReporters: ['html', 'text'],
	coverageDirectory: 'coverage',

	// 指定要收集覆盖率数据的文件路径模式
	collectCoverageFrom: ['src/**/*.ts'],

	// 指定哪些文件需要被忽略
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],

	// 指定转换器
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.js$': 'babel-jest',
	},

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

	// 指定快照文件的目录
	// snapshotSerializers: ['enzyme-to-json/serializer'],
	// snapshotResolver: './snapshot-resolver.js',
}
