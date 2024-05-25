import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserRepository } from '../../user/application/repositories/CreateUserRepository';
import { UserDocument } from '../../user/infra/schemas/user.schema';
import { VerifyUserRepository } from '../../user/application/repositories/VerifyUserRepository';
import { User } from '../../user/domain/entities/User';
import { FindUserByEmailRepository } from 'src/modules/user/application/repositories/FindUserByEmailRepository';
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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).lean();
    return {
      _id: user._id.toString(),
      ...user,
    } as unknown as User;
  }
}
