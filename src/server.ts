import http from "http";
import app from "./app.js";
import { initWebSocket } from "@services/websocket.js";
import { logger } from "@utils/logger.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;

const server = http.createServer(app);
initWebSocket(server);

server.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
});
