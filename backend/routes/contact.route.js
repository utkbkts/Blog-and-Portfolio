import express from "express";
import contactController from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/send", contactController.contactSend);

export default router;
