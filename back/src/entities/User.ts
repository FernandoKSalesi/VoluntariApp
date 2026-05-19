export class User {
  id?: number | undefined;
  name: string;
  email: string;
  phone?: string | null | undefined;
  cpf?: string | null | undefined;
  username: string;
  passwordHash: string;

  constructor(props: Omit<User, 'id'>, id?: number | undefined) {
    this.id = id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.cpf = props.cpf;
    this.username = props.username;
    this.passwordHash = props.passwordHash;
  }
}
