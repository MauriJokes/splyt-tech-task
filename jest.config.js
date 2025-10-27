export default {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
    },
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.jest.json",
        },
    },
    setupFiles: ["<rootDir>/tests/setup/redis-mock.ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
        "^@routes/(.*)$": "<rootDir>/src/routes/$1",
        "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@services/(.*)$": "<rootDir>/src/services/$1",
        "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
        "^@validations/(.*)$": "<rootDir>/src/validations/$1",
        "^@typings/(.*)$": "<rootDir>/src/types/$1",
    },
    transformIgnorePatterns: ["node_modules/(?!ioredis)"],
    testMatch: ["**/tests/**/*.test.ts"],
};
