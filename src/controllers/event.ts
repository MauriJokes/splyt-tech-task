import type { Request, Response } from "express";
import { eventSchema } from "@validations/event.js";
import { EventService } from "@services/event.js";
import type { DriverEvent } from "@typings/driver.js";
import { logger } from "@utils/logger.js";

export const handleEvent = (req: Request, res: Response) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
        logger.error("Validation Error", error?.details[0]?.message);
        return res.sendStatus(400);
    }

    const event = value as DriverEvent;

    EventService.storeEvent(event);
    logger.info("Received driver event", { driver: event.data.driver_id });

    EventService.broadcast(event);
    logger.info("Broadcasting driver event", { driver: event.data.driver_id });

    return res.sendStatus(200);
};
