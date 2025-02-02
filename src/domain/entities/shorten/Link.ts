export class Link {
  public readonly id: string;
  public link: string;
  public long_url: string;
  public custom_id: string;
  public references: ShortenLink.GroupTypes;
  public archived?: boolean;
  public tags?: any[];
  public created_at?: Date;

  constructor(props: any) {
    Object.assign(this, props);
  }
}

export namespace ShortenLink {
  export interface GroupTypes {
    group: string;
  }
}
