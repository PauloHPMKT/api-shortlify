export class Link {
  public link: string;
  public long_url: string;
  public custom_id: string;
  public references: ShortenLink.GroupTypes;
  public archived?: boolean;
  public tags?: string[];
  public created_at?: Date;

  constructor(props: Link) {
    Object.assign(this, props);
    this.created_at = props.created_at || new Date();
    this.archived = props.archived ?? false;
    this.tags = props.tags ?? [];
  }
}

export namespace ShortenLink {
  export interface GroupTypes {
    group: string;
  }

  export interface Tag {
    name: string;
    id: string;
  }
}
