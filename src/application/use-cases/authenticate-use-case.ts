import { UserRepositoryInterface } from "../../domain/repository";
import { v4 as uuidv4 } from "uuid";

export type AuthInput = {
  email: string;
  password: string;
};

export type UserOutpu = {
  authCode: string;
  userId: number;
};

export class AuthenticateUseCase {
  constructor(private authRepo: UserRepositoryInterface) {}

  static build(authRepo: UserRepositoryInterface) {
    return new AuthenticateUseCase(authRepo);
  }

  async execute(data: AuthInput): Promise<UserOutpu> {
    const user = await this.authRepo.findbyEmail(data.email);

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    if (user.password !== data.password) {
      throw new Error("Email ou senha inválidos");
    }

    const response: UserOutpu = {
      authCode: uuidv4(),
      userId: user.id,
    };

    return response;
  }
}
