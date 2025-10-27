import { WebSocketServer } from "ws";
import { EventService } from "./event.js";
export const subscriptions = new Map();
export let wss;
export const initWebSocket = (server) => {
    wss = new WebSocketServer({ server, path: "/ws" });
    wss.on("connection", (socket, req) => {
        const url = new URL(req.url ?? "", "http://localhost");
        console.log("WS CONNECTED", req.url);
        const driverId = url.searchParams.get("driver_id") || "";
        const since = url.searchParams.get("since") || "";
        subscriptions.set(socket, { driverId, since });
        // Send historical events first
        if (driverId) {
            const pastEvents = EventService.getEventsSince(driverId, since);
            for (const ev of pastEvents)
                socket.send(JSON.stringify(ev));
        }
        socket.on("close", () => {
            subscriptions.delete(socket);
        });
    });
    // wss.on("connection", (ws) => {
    //     console.log("New WS connection");
    //     ws.on("message", (msg) => console.log("Message:", msg.toString()));
    // });
    console.log("✅ WebSocket server initialized at /ws");
};
//# sourceMappingURL=websocket.js.map