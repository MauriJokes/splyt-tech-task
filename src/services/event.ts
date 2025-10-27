import type { DriverEvent } from "@typings/driver.js";
import { subscriptions } from "@services/websocket.js";

const eventStore = new Map<string, DriverEvent[]>();

export const EventService = {
    storeEvent(event: DriverEvent) {
        const driverId = event.data.driver_id;
        const driverEvents = eventStore.get(driverId) || [];
        driverEvents.push(event);

        if (driverEvents.length > 1000) {
            driverEvents.shift();
        }

        eventStore.set(driverId, driverEvents);
    },

    getEventsSince(driverId: string, since?: string) {
        const events = eventStore.get(driverId) || [];

        if (!since) {
            return events;
        }

        return events.filter(function (e) {
            return e.data.timestamp >= since;
        });
    },

    broadcast(event: DriverEvent) {
        for (const [socket, sub] of subscriptions.entries()) {
            if (
                sub.driverId === event.data.driver_id &&
                socket.readyState === socket.OPEN
            ) {
                socket.send(JSON.stringify(event));
            }
        }
    },
};
