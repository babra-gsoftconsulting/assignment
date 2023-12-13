import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { User, UserSchema } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.EXPIRE_IN },
      }),
    }),
  ],
  exports: [JwtModule],
  providers: [JwtStrategy, UserService],
})
export class Jwt {}
