import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/models/user.model';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule } from '@nestjs/config'; 

import { config } from 'dotenv';
config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, 
    }),
    UserModule,PassportModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ConfigModule
  ],
  providers: [AuthService, UserService, JwtService, LocalStrategy],
  controllers: [AuthController],
  
})
export class AuthModule {}
