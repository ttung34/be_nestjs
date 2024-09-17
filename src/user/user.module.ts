import { Module } from '@nestjs/common';
import {  UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/service/prisma.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [JwtModule.register({
      global: true,
      secret:process.env.JWT_PRIVATE_KEY,
      signOptions: { expiresIn: '3600s' },
    }),],
  controllers: [UserController],
  providers: [PrismaService,UserService],
})
export class UserModule {}
