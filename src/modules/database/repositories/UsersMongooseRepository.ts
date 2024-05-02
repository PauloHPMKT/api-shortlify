import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserRepository } from '../../user/infra/repositories/CreateUserRepository';
import { UserDocument } from '../../user/infra/schemas/user.schema';
import { VerifyUserRepository } from '../../user/infra/repositories/VerifyUserRepository';
import { User } from '../../user/domain/entities/User';

export class UsersMongooseRepository
  implements CreateUserRepository, VerifyUserRepository
{
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: any): Promise<string> {
    const user = await this.userModel.create(data);
    return user._id.toString();
  }

  async verify(data: Partial<User>): Promise<boolean> {
    const user = await this.userModel.exists(data);
    return !!user;
  }
}
