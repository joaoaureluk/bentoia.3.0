import { Request, Response } from "express";
import {
  GeminiInput,
  GeminiServices,
} from "../../application/services/gemini-services";

export class GeminiController {
  private geminiServices: GeminiServices;

  constructor(geminiServices: GeminiServices) {
    this.geminiServices = geminiServices;
    this.handler = this.handler.bind(this);
  }

  public async handler(req: Request, res: Response): Promise<void> {
    try {
      const { prompt, name } = req.body;

      if (
        !prompt ||
        typeof prompt !== "string" ||
        !name ||
        typeof name !== "string"
      ) {
        throw new Error("O prompt deve ser uma string");
      }

      const request: GeminiInput = { prompt, name };

      const result = await this.geminiServices.getGemini(request);

      res.status(200).json({ result });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro inesperado ao processar a solicitação.";
      res.status(500).json({ error: message });
    }
  }
}
