import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserRepository } from '../../user/infra/repositories/CreateUserRepository';
import { UserDocument } from '../../user/infra/schemas/user.schema';
import { VerifyUserRepository } from '../../user/infra/repositories/VerifyUserRepository';
import { User } from '../../user/domain/entities/User';
import { FindUserByEmailRepository } from 'src/modules/user/infra/repositories/FindUserByEmailRepository';

export class UsersMongooseRepository
  implements
    CreateUserRepository,
    VerifyUserRepository,
    FindUserByEmailRepository
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

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    console.log(user);
    return;
  }
}
