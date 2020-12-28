import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    try {
      const user = await this.userModel.create(createUserDto);
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      return user.save();
    } catch (error) {
      if (error.code === 11000) {
        // duplicate email
        throw new ConflictException([`Email ${email} already exists`]);
      }
      throw error;
    }
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const { restaurantName } = updateUserDto;
    user.restaurantName = restaurantName;
    await user.save();
    return user;
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.userModel.findOne({ email });

    if (user && (await bcrypt.hash(password, user.salt)) === user.password) {
      return user.email;
    }
    return null;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findOne(user: Partial<User>): Promise<User> {
    return this.userModel.findOne(user);
  }

  async getAll(): Promise<Array<User>> {
    return this.userModel.find();
  }
}
