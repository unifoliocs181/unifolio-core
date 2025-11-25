module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/__tests__', '<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.tsx',
        '!src/app/firebase.ts',
        '!src/app/layout.tsx',
        '!src/app/page.tsx',
        '!src/app/api/**',
        '!src/components/**',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/.next/',
        '/coverage/',
    ],
    coverageReporters: ['text', 'text-summary', 'html', 'lcov'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
    testTimeout: 10000,
    globals: {
        'ts-jest': {
            tsconfig: {
                jsx: 'react-jsx',
                esModuleInterop: true,
            },
        },
    },
}
