import { logger } from "../../../src/utils/logger";

describe("logger", () => {
    it("should log info messages", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => {});
        logger.info("Server started");
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("INFO"));
        spy.mockRestore();
    });
});
