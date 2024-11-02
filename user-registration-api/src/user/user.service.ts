// import { Injectable, ConflictException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
// import { User } from './user.schema'; // Adjust the path as necessary

// @Injectable()
// export class UserService {
//   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

//   async register(email: string, password: string) {
//     const existingUser = await this.userModel.findOne({ email });
//     if (existingUser) throw new ConflictException('Email already exists');

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new this.userModel({ email, password: hashedPassword });
//     await newUser.save();
//     return { message: 'User registered successfully' };
//   }
// }

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async register(email: string, password: string) {
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return { message: 'Login successful' }; // Optionally, return a token or user info
  }
}
