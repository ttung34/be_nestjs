import { Body, Controller, Get, Post } from '@nestjs/common';
import {UserService } from './user.service';
import {LoginDto, UserDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() data: UserDto) {

    return this.userService.createUser(data);
  }

  @Post('/login') 
  async Login(@Body() data: LoginDto){
    return this.userService.login(data);
  }
}
