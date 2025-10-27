import type { DriverEvent } from "../../../src/types/driver";

const mockZadd = jest.fn();
const mockZrangebyscore = jest.fn();
const mockSadd = jest.fn();
const mockSrem = jest.fn();

const RedisMock = jest.fn().mockImplementation(() => ({
    zadd: mockZadd,
    zrangebyscore: mockZrangebyscore,
    sadd: mockSadd,
    srem: mockSrem,
}));

jest.mock("ioredis", () => ({
    __esModule: true,
    default: RedisMock,
}));

import {
    addDriverEvent,
    getDriverEvents,
    addSubscription,
    removeSubscription,
} from "../../../src/utils/redis";

describe("Redis helper functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should add a driver event with correct key, score, and value", async () => {
        const driverEvent: DriverEvent = {
            event: {
                name: "driver_location",
                time: "2025-10-24T08:00:00Z",
            },
            data: {
                driver_id: "driver_001",
                latitude: 1.35,
                longitude: 103.82,
                timestamp: "2025-10-24T08:00:00Z",
            },
        };

        await addDriverEvent(driverEvent);

        const key = "driver:driver_001:events";
        const score = new Date(driverEvent.data.timestamp).getTime();
        const value = JSON.stringify(driverEvent);

        expect(mockZadd).toHaveBeenCalledWith(key, score, value);
    });

    it("should retrieve driver events after a certain timestamp", async () => {
        const driverId = "driver123";
        const since = "2025-10-26T00:00:00Z";

        const mockEvents = [
            JSON.stringify({
                data: {
                    driver_id: driverId,
                    timestamp: "2025-10-27T12:00:00Z",
                },
            }),
        ];

        mockZrangebyscore.mockResolvedValueOnce(mockEvents);

        const result = await getDriverEvents(driverId, since);

        expect(mockZrangebyscore).toHaveBeenCalledWith(
            `driver:${driverId}:events`,
            new Date(since).getTime(),
            "+inf"
        );

        expect(result).toEqual([
            {
                data: {
                    driver_id: driverId,
                    timestamp: "2025-10-27T12:00:00Z",
                },
            },
        ]);
    });

    it("should add a websocket subscription", async () => {
        const driverId = "driver123";
        const wsId = "ws-1";

        await addSubscription(driverId, wsId);

        expect(mockSadd).toHaveBeenCalledWith(`ws:driver:${driverId}`, wsId);
    });

    it("should remove a websocket subscription", async () => {
        const driverId = "driver123";
        const wsId = "ws-1";

        await removeSubscription(driverId, wsId);

        expect(mockSrem).toHaveBeenCalledWith(`ws:driver:${driverId}`, wsId);
    });
});
