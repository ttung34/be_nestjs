import { Module } from '@nestjs/common';
import {  UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/service/prisma.service';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService,UserService],
})
export class UserModule {}
