import { WebSocketServer, WebSocket } from "ws";
import type { DriverEvent } from "@typings/driver.js";
export declare const subscriptions: Map<WebSocket, {
    driverId: string;
    wsId: string;
}>;
export declare let wss: WebSocketServer;
export declare function initWebSocket(server: any): void;
export declare function broadcastDriverEvent(event: DriverEvent): Promise<void>;
//# sourceMappingURL=websocket.d.ts.map