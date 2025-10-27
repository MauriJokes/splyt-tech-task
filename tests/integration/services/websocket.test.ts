import WebSocket from "ws";
import http from "http";
import app from "../../../src/app";
import request from "supertest";
import { initWebSocket } from "../../../src/services/websocket";

let server: http.Server;

beforeAll((done) => {
    server = http.createServer(app);
    initWebSocket(server);
    server.listen(0, done); // random available port
});

afterAll((done) => {
    server.close(done);
});

it("should broadcast driver event to connected client", (done) => {
    jest.setTimeout(10000);

    const port = (server.address() as any).port;
    const ws = new WebSocket(
        `ws://localhost:${port}/ws?driver_id=driver_001&token=${process.env.JWT_SECRET}`
    );

    ws.on("open", async () => {
        // send event after opening
        await request(app)
            .post("/event")
            .send({
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
            });
    });

    ws.on("message", (message) => {
        const parsed = JSON.parse(message.toString());
        expect(parsed.data.driver_id).toBe("driver_001");
        ws.close();
    });

    ws.on("close", () => {
        setTimeout(() => done(), 50);
    });
});
