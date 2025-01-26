export class Account {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public shortenLinks?: string[];
  public avatar?: string;
  public isActive?: boolean;
  public createdAt?: Date;

  constructor(props: Omit<Account, 'id'>) {
    Object.assign(this, props);

    this.avatar = props.avatar ?? null;
    this.shortenLinks = props.shortenLinks ?? [];
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt || new Date();
  }
}
