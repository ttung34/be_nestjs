import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {  UserModule } from './module/user/user.module';
import { JWTMiddleware } from './middleware/jwt.middleware';
import { UserController } from './module/user/user.controller';
import { BookModule } from './module/book/book.module';

@Module({
  imports: [UserModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JWTMiddleware).exclude(
        { path: 'api/v1/user/register', method: RequestMethod.POST },
        { path: 'api/v1/user/login', method: RequestMethod.POST },
      )
      .forRoutes(UserController);
  }
}

// Sử dụng middleware cho userController
// Khi có một bất kỳ gửi lên đều phải qua middleware này
