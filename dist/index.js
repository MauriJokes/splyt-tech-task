// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import http from "http";
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });
// In-memory store: map driver_id -> array of events
const store = new Map();
// Simple subscription registry: ws -> {driver_id, since}
const subs = new Map();
wss.on("connection", (socket, req) => {
    // Accept query params like ?driver_id=driver_001&since=...
    const url = new URL(req.url ?? "", `http://localhost`);
    const driver_id = url.searchParams.get("driver_id") || "";
    const since = url.searchParams.get("since") || "";
    subs.set(socket, { driver_id, since });
    // send historical events since "since"
    const events = store.get(driver_id) || [];
    console.log(events);
    let eventsToSend = events;
    if (since === "") {
        // Apply filter only if 'since' is present
        eventsToSend = events.filter((e) => e.data.timestamp >= since);
    }
    // Send all events in the resulting array (filtered or unfiltered)
    for (const e of eventsToSend) {
        socket.send(JSON.stringify(e));
    }
    socket.on("close", () => {
        subs.delete(socket);
    });
});
// Ingestion endpoint that Splyt will call
app.post("/event", (req, res) => {
    const ev = req.body;
    if (!ev?.data?.driver_id) {
        return res.status(400).send("missing driver");
    }
    const driverId = ev.data.driver_id;
    // store
    const arr = store.get(driverId) || [];
    arr.push(ev);
    // (optional) trim store to last N items per driver
    if (arr.length > 1000)
        arr.shift();
    store.set(driverId, arr);
    // broadcast to subscribers for this driver
    for (const [socket, s] of subs.entries()) {
        console.log(socket);
        if (s.driver_id === driverId && socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify(ev));
        }
    }
    // respond fast
    res.sendStatus(200);
});
const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;
server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map