import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserRepository } from '../../user/infra/repositories/CreateUserRepository';
import { UserDocument } from '../../user/infra/schemas/user.schema';

export class UsersMongooseRepository implements CreateUserRepository {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: any): Promise<string> {
    const user = await this.userModel.create(data);
    return user._id.toString();
  }
}
