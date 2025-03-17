import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION ?? 'mongodb://localhost:27017/my-app'),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
