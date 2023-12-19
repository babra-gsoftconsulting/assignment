import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const hashedPassword = await hash(user.password, 10);
    const createdUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.userModel.findOne({ email });
    if (data) return data['_doc'];
    throw new NotFoundException("Record does not exist!")
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async test(): Promise<string> {
    return 'this route only access by admin';
  }
}
