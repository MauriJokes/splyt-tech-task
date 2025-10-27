import type { DriverEvent } from "@typings/driver.js";
export declare const EventService: {
    storeEvent(event: DriverEvent): void;
    getEventsSince(driverId: string, since?: string): DriverEvent[];
    broadcast(event: DriverEvent): void;
};
//# sourceMappingURL=event.d.ts.map