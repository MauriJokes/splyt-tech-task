import { Router } from "express";
import { handleEvent } from "@controllers/event";

const router = Router();

router.get("/", (req, res) => res.send("OK"));
router.post("/event", handleEvent);

export default router;
