type UserProps = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export class User {
  private props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  static create(props: UserProps) {
    User.validate(props);
    return new User(props);
  }

  static with(props: UserProps) {
    return new User(props);
  }

  get id(): number {
    return this.props.id as number;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  private static validate(props: UserProps): void {
    if (props.name.length < 3 || !props.name.includes(" ")) {
      throw new Error(
        "O nome deve contar pelo menos 3 carcteres e conter um espaço"
      );
    }

    if (!props.email.includes("@")) {
      throw new Error("Digite um email válido");
    }

    if (props.password.length < 6) {
      throw new Error("A senha deve conter pelo menos 6 carcteres");
    }
  }
}
