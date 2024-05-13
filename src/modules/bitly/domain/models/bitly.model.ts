import { Bitly } from '../entities/Bitly';

export namespace BitlyModel {
  export type toCreate = Omit<
    Bitly,
    '_id | created_at | custom_bitlinks | deeplinks | tags'
  >;
}
