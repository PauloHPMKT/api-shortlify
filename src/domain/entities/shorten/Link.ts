export class Link {
  public readonly id: string;
  public archived: boolean;
  public created_at?: Date;
  public custom_bitlinks?: any[];
  public deeplinks?: any[];
  public custom_id: string;
  public link: string;
  public long_url: string;
  public references: ShortenLink.GroupTypes;
  public tags?: any[];

  constructor(props: any) {
    Object.assign(this, props);
  }
}

export namespace ShortenLink {
  export interface GroupTypes {
    group: string;
  }
}
