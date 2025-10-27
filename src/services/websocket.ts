import { WebSocketServer, WebSocket } from "ws";
import {
    getDriverEvents,
    addSubscription,
    removeSubscription,
} from "@utils/redis";
import { logger } from "@utils/logger";
import crypto from "crypto";
import type { DriverEvent } from "@typings/driver";

export const subscriptions = new Map<
    WebSocket,
    { driverId: string; wsId: string }
>();
export let wss: WebSocketServer;

export function initWebSocket(server: any) {
    wss = new WebSocketServer({ server, path: "/ws" });

    wss.on("connection", async (socket, req) => {
        const url = new URL(req.url ?? "", "http://localhost");
        const token = url.searchParams.get("token");

        if (!token || token !== process.env.JWT_SECRET) {
            socket.close(4001, "Unauthorized");
            logger.error("Missing token", req.url);
            return;
        }

        const driverId = url.searchParams.get("driver_id") || "";
        const since = url.searchParams.get("since") || "";

        // generate unique wsId for this connection
        const wsId = crypto.randomUUID();

        // Send past events
        if (driverId) {
            subscriptions.set(socket, { driverId, wsId });
            await addSubscription(driverId, wsId);

            const pastEvents = await getDriverEvents(driverId, since);
            for (const ev of pastEvents) {
                socket.send(JSON.stringify(ev));
            }
        }

        // Handle disconnect
        socket.on("close", async () => {
            logger.info(`WS DISCONNECTED: ${driverId}`);
            subscriptions.delete(socket);
            if (driverId) await removeSubscription(driverId, wsId);
        });
    });

    logger.info("WebSocket server initialized at /ws");
}

export async function broadcastDriverEvent(event: DriverEvent) {
    for (const [socket, sub] of subscriptions) {
        if (
            sub.driverId === event.data.driver_id &&
            socket.readyState === socket.OPEN
        ) {
            socket.send(JSON.stringify(event));
        }
    }
}
