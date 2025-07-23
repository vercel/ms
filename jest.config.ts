import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
	moduleFileExtensions: ['ts', 'js'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testMatch: ['**/src/**/*.test.ts'],
};

export default config;
