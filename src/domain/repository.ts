import { User } from "./entities/user";

export interface UserRepositoryInterface {
  create(props: User): Promise<void>;
  findbyId(id: number): Promise<User | null>;
  findbyEmail(email: string): Promise<User | null>;
}
