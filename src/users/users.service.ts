import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(createUserDto);

    return newUser;
  }

  async findAll() {
    const allUsers = await this.userModel.find();

    return allUsers;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ userId: id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return this.userModel.findOneAndUpdate({ userId: id }, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.userModel.findOneAndDelete({ userId: id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }
}
