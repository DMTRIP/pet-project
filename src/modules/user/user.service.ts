import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { CreateUserInput } from './api/createUser.input';
import { UpdateUserInput } from './api/updateUser.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(id: ID): Promise<User> {
    const user = await this.userModel.findById(id).lean();

    if (!user) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return user;
  }

  async createUser(input: CreateUserInput): Promise<User> {
    return this.userModel.create(input);
  }

  async updateUser(id: ID, input: UpdateUserInput): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .lean();

    if (!user) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return user;
  }

  async deleteUser(id: ID): Promise<User> {
    const user = await this.userModel.findOneAndDelete({ _id: id }).lean();

    if (!user) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return user;
  }
}
