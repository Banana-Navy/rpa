import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}
  async create(data) {
    try {
      const response = await this.userModel.create(data);
      return response;
    } catch (error) {
      console.error('Error while creating user:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const users = this.userModel.find();
      return users;
    } catch (error) {
      return error;
    }
  }
}
