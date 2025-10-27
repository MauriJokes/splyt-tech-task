import { Router } from "express";
import { handleEvent } from "@controllers/event.js";
const router = Router();
router.get("/", (req, res) => res.send("OK"));
router.post("/event", handleEvent);
export default router;
//# sourceMappingURL=event.js.map