import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) { }

  async register(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ name, email, password: hashedPassword, role: 'user' });
    return newUser.save();
  }

  async findUser(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ id: userId });
    if (!user) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }
    return user;
  }

}
