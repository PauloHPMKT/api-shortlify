import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserModel } from '../../domain/models/user.model';

export type UserDocument = HydratedDocument<User>;

@Schema({})
export class User implements UserModel.toCreate {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    default: null,
  })
  avatar: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  is_active: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
