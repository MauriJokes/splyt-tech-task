import RedisMock from "ioredis-mock";

jest.mock("ioredis", () => ({
    __esModule: true,
    default: RedisMock,
}));
