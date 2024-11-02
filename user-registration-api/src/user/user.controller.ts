// import { Body, Controller, Post } from '@nestjs/common';
// import { UserService } from './user.service';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post('register')
//   async register(@Body() body: { email: string; password: string }) {
//     return this.userService.register(body.email, body.password);
//   }
// }

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body) {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    return this.userService.register(email, password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return await this.userService.login(email, password);
  }
}
