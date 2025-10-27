import type { DriverEvent } from "@typings/driver.js";
export declare function addDriverEvent(driverEvent: DriverEvent): Promise<void>;
export declare function getDriverEvents(driverId: string, since: string): Promise<DriverEvent[]>;
export declare function addSubscription(driverId: string, wsId: string): Promise<void>;
export declare function removeSubscription(driverId: string, wsId: string): Promise<void>;
//# sourceMappingURL=redis.d.ts.map