import { Request, Response } from "express";
import {
  CreateUserUseCase,
  UserInput,
} from "../../application/use-cases/create-user-use-case";
import { UserRepositoryInterface } from "../../domain/repository";
import {
  CreateIdUsecase,
  UserOutpu,
} from "../../application/use-cases/get-user-by-id-use-case";

export class CreateUserController {
  private userUseCases: CreateUserUseCase;

  constructor(repository: UserRepositoryInterface) {
    this.userUseCases = CreateUserUseCase.build(repository);
    this.handler = this.handler.bind(this);
  }

  public async handler(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new Error("Todos os campos são obrigatórios");
      }

      if (typeof name !== "string") {
        throw new Error("O nome deve ser uma string");
      }

      if (typeof email !== "string") {
        throw new Error("O email deve ser uma string");
      }

      if (typeof password !== "string") {
        throw new Error("A senha deve ser uma string");
      }

      const input: UserInput = { name, email, password };

      await this.userUseCases.execute(input);

      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export class GetUserByIdController {
  private userUseCases: CreateIdUsecase;

  constructor(repository: UserRepositoryInterface) {
    this.userUseCases = CreateIdUsecase.build(repository);
    this.handler = this.handler.bind(this);
  }

  public async handler(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await this.userUseCases.execute(Number(id));

      const response: UserOutpu = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
