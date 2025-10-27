import type { Request, Response } from "express";
import { eventSchema } from "@validations/event";
import type { DriverEvent } from "@typings/driver";
import { logger } from "@utils/logger";
import { addDriverEvent } from "@utils/redis";
import { broadcastDriverEvent } from "@services/websocket";

export const handleEvent = async (req: Request, res: Response) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
        logger.error("Validation Error", error?.details[0]?.message);
        return res.sendStatus(400);
    }

    const event = value as DriverEvent;

    await addDriverEvent(event); // to store an event
    logger.info("Received driver event", { driver: event.data.driver_id });

    await broadcastDriverEvent(event);
    logger.info("Broadcasting driver event", { driver: event.data.driver_id });

    return res.sendStatus(200);
};
