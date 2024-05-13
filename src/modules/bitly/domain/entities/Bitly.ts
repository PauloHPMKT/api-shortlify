import { BitlyModel } from '../models/bitly.model';

export class Bitly {
  public readonly _id: string;
  public archived: boolean;
  public id: string;
  public link: string;
  public long_url: string;
  public references: ShortenLink.GroupTypes;
  public custom_bitlinks?: any[];
  public deeplinks?: any[];
  public tags?: any[];
  public created_at?: Date;

  constructor(props: BitlyModel.toCreate) {
    Object.assign(this, props);
  }
}

export namespace ShortenLink {
  export type GroupTypes = {
    group: string;
  };
}
