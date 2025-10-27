import Redis from "ioredis";
import type { RedisOptions } from "ioredis";
import type { DriverEvent } from "@typings/driver";

//@ts-ignore
const redis = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
} as RedisOptions);

export async function addDriverEvent(driverEvent: DriverEvent) {
    const key = `driver:${driverEvent.data.driver_id}:events`;
    const score = new Date(driverEvent.data.timestamp).getTime();
    const value = JSON.stringify(driverEvent);

    await redis.zadd(key, score, value);
}

export async function getDriverEvents(
    driverId: string,
    since: string
): Promise<DriverEvent[]> {
    const key = `driver:${driverId}:events`;
    const sinceTimestamp = new Date(since).getTime();
    const events = await redis.zrangebyscore(key, sinceTimestamp, "+inf");
    return events.map((e: string) => JSON.parse(e) as DriverEvent);
}

export async function addSubscription(driverId: string, wsId: string) {
    const key = `ws:driver:${driverId}`;
    await redis.sadd(key, wsId);
}

export async function removeSubscription(driverId: string, wsId: string) {
    const key = `ws:driver:${driverId}`;
    await redis.srem(key, wsId);
}
