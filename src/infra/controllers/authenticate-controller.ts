import { Request, Response } from "express";
import { UserRepositoryInterface } from "../../domain/repository";
import {
  AuthenticateUseCase,
  AuthInput,
} from "../../application/use-cases/authenticate-use-case";

export class AuthenticateController {
  private authUseCase: AuthenticateUseCase;

  constructor(repository: UserRepositoryInterface) {
    this.authUseCase = AuthenticateUseCase.build(repository);
    this.handler = this.handler.bind(this);
  }

  public async handler(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Todos os campos são obrigatórios");
      }

      if (typeof email !== "string" || typeof password !== "string") {
        throw new Error("Email e senha devem ser strings");
      }

      const input: AuthInput = { email, password };

      const result = await this.authUseCase.execute(input);

      res.status(200).json({
        message: "Autenticação realizada com sucesso",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
