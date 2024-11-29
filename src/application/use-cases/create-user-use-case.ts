import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/repository";

export type UserInput = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  static build(userRepository: UserRepositoryInterface) {
    return new CreateUserUseCase(userRepository);
  }

  async execute(props: UserInput): Promise<void> {
    const user = User.create(props);
    await this.userRepository.create(user);
  }
}
