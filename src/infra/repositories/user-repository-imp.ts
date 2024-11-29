import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/repository";

export class UserRepository implements UserRepositoryInterface {
  private constructor(readonly prisma: PrismaClient) {}

  static build(prisma: PrismaClient): UserRepositoryInterface {
    return new UserRepository(prisma);
  }

  async create(props: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        name: props.name,
        email: props.email,
        password: props.password,
      },
    });
  }

  async findbyId(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    const response = User.with({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return response;
  }

  async findbyEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const response = User.with({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return response;
  }
}
