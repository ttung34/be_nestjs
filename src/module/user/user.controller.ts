import { Body, Controller, Get, Post , Req} from '@nestjs/common';
import {UserService } from './user.service';
import {LoginDto, UserDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async createUser(@Body() data: UserDto) {
    return await this.userService.createUser(data);
  }

  @Post('/login') 
  async login(@Body() data: LoginDto){
    return await this.userService.login(data);
  }

  @Get('/me')
  async getProfileMe(@Req() req: Request): Promise<any>{
    console.log("UserController ~ getProfileMe ~ req: ", req);
    const userId = req["user"]?.id as number;
    console.log("UserController ~ getProfileMe ~ userId: ", userId);
    return await this.userService.getInformationMe(userId);
  }
}
