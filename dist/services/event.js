import { subscriptions } from "@services/websocket.js";
const eventStore = new Map();
export const EventService = {
    storeEvent(event) {
        const driverId = event.data.driver_id;
        const driverEvents = eventStore.get(driverId) || [];
        driverEvents.push(event);
        if (driverEvents.length > 1000)
            driverEvents.shift();
        eventStore.set(driverId, driverEvents);
    },
    getEventsSince(driverId, since) {
        const events = eventStore.get(driverId) || [];
        if (!since)
            return events;
        return events.filter((e) => e.data.timestamp >= since);
    },
    broadcast(event) {
        for (const [socket, sub] of subscriptions.entries()) {
            if (sub.driverId === event.data.driver_id &&
                socket.readyState === socket.OPEN) {
                socket.send(JSON.stringify(event));
            }
        }
    },
};
//# sourceMappingURL=event.js.map