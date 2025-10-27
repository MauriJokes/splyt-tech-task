import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
export declare const subscriptions: Map<WebSocket, {
    driverId: string;
    since?: string;
}>;
export declare let wss: WebSocketServer;
export declare const initWebSocket: (server: any) => void;
//# sourceMappingURL=websocket.d.ts.map