import { UserRepositoryInterface } from "../../domain/repository";

export type UserOutpu = {
  id: number;
  name: string;
  email: string;
};

export class CreateIdUsecase {
  constructor(private userRepository: UserRepositoryInterface) {}

  static build(userRepository: UserRepositoryInterface) {
    return new CreateIdUsecase(userRepository);
  }

  async execute(Id: number): Promise<UserOutpu> {
    const user = await this.userRepository.findbyId(Id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const response: UserOutpu = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response;
  }
}
