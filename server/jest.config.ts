// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/tests/**/*.test.ts'],
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    collectCoverage: true,
    reporters: ['default'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['src/**/*.{js,ts}',       // Adjust to your source files
        '!src/**/*.d.ts',         // Ignore type declarations
        '!src/tests/**',],
};

export default config;
