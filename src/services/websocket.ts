import { WebSocketServer, WebSocket } from "ws";
import { EventService } from "./event.js";
import { logger } from "@utils/logger.js";

export const subscriptions = new Map<
    WebSocket,
    { driverId: string; since?: string }
>();
export let wss: WebSocketServer;

export const initWebSocket = (server: any) => {
    wss = new WebSocketServer({ server, path: "/ws" });

    wss.on("connection", (socket, req) => {
        const url = new URL(req.url ?? "", "http://localhost");
        const token = url.searchParams.get("token");

        if (!token || token !== process.env.JWT_SECRET) {
            socket.close(4001, "Unauthorized");
            logger.error("Missing token", req.url);
            return;
        }

        const driverId = url.searchParams.get("driver_id") || "";
        const since = url.searchParams.get("since") || "";

        subscriptions.set(socket, { driverId, since });

        if (driverId) {
            const pastEvents = EventService.getEventsSince(driverId, since);

            for (const ev of pastEvents) {
                socket.send(JSON.stringify(ev));
            }
        }

        socket.on("message", (msg) => {
            logger.info(
                `Message from ${driverId || "unknown"}: ${msg.toString()}`
            );
        });

        // Handle disconnection
        socket.on("close", () => {
            logger.info(`WS DISCONNECTED: ${driverId}`);
            subscriptions.delete(socket);
        });
    });

    logger.info("WebSocket server initialized at /ws");
};
