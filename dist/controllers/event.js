import { eventSchema } from "@validations/event.js";
import { EventService } from "@services/event.js";
import { logger } from "@utils/logger.js";
export const handleEvent = (req, res) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
        logger.error("Validation Error", error?.details[0]?.message);
        return res.sendStatus(400);
    }
    const event = value;
    EventService.storeEvent(event);
    logger.info("Received driver event", { driver: event.data.driver_id });
    EventService.broadcast(event);
    logger.info("Broadcasting driver event", { driver: event.data.driver_id });
    return res.sendStatus(200);
};
//# sourceMappingURL=event.js.map