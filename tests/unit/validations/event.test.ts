import { eventSchema } from "../../../src/validations/event";

describe.only("eventSchema", () => {
    const validPayload = {
        event: { name: "driver_location", time: "2025-10-24T08:00:00Z" },
        data: {
            driver_id: "driver_001",
            latitude: 1.35,
            longitude: 103.82,
            timestamp: "2025-10-24T08:00:00Z",
        },
    };

    it("should pass validation for a valid event", () => {
        const { error } = eventSchema.validate(validPayload);
        expect(error).toBeUndefined();
    });

    it("should fail if driver field is missing", () => {
        const invalid = {
            ...validPayload,
            data: { ...validPayload.data, driver: undefined },
        };
        const { error } = eventSchema.validate(invalid);
        expect(error).toBeDefined();
    });

    it("should fail for invalid latitude", () => {
        const invalid = {
            ...validPayload,
            data: { ...validPayload.data, latitude: 200 },
        };
        const { error } = eventSchema.validate(invalid);
        expect(error?.message).toContain("latitude");
    });
});
