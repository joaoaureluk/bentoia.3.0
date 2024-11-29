import { Router } from "express";
import { GeminiController } from "../../controllers/gemini-controller";
import { GeminiServices } from "../../../application/services/gemini-services";

const geminiRoutes = Router();

const geminiServices = new GeminiServices();
const geminiController = new GeminiController(geminiServices);

geminiRoutes.post("/ia", geminiController.handler);

export default geminiRoutes;
