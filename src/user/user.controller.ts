import { Body, Controller, Get, Post } from '@nestjs/common';
import {UserService } from './user.service';
import {UserDto } from './user.dto';
import { User } from '@prisma/client';

@Controller('api/v1/auth')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('register')
  async createAuth(@Body() data: UserDto) {

    return this.authService.createAuth(data);
  }
}
