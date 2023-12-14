import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './common/configs/database.module.config';
import { BookModule } from './book/book.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/middlewares/global.exception';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MongooseModule.forFeature([]),
    AuthModule,
    UserModule,
    BookModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(('auth/(.*)'))
    .forRoutes('*')
  }
}
