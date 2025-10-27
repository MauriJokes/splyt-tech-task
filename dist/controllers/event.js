import { eventSchema } from "@validations/event.js";
import { logger } from "@utils/logger.js";
import { addDriverEvent } from "@utils/redis.js";
import { broadcastDriverEvent } from "@services/websocket.js";
export const handleEvent = async (req, res) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
        logger.error("Validation Error", error?.details[0]?.message);
        return res.sendStatus(400);
    }
    const event = value;
    await addDriverEvent(event); // to store an event
    logger.info("Received driver event", { driver: event.data.driver_id });
    await broadcastDriverEvent(event);
    logger.info("Broadcasting driver event", { driver: event.data.driver_id });
    return res.sendStatus(200);
};
//# sourceMappingURL=event.js.map