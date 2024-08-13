module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	cacheDirectory: '.tmp/jestCache',
	setupFiles: ['<rootDir>/setupTest.ts'],
};
