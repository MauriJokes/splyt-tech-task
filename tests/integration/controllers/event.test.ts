import request from "supertest";
import app from "../../../src/app";

describe("POST /event", () => {
    const validPayload = {
        event: {
            name: "driver_location",
            time: "2025-10-27T10:00:00Z",
        },
        data: {
            driver_id: "driver_001",
            latitude: 3.14,
            longitude: 101.68,
            timestamp: "2025-10-27T10:00:00Z",
        },
    };

    it("should return 200 for valid payload", async () => {
        const res = await request(app).post("/event").send(validPayload);
        expect(res.status).toBe(200);
    });

    it("should return 400 for invalid payload", async () => {
        const res = await request(app).post("/event").send({});
        expect(res.status).toBe(400);
    });
});
