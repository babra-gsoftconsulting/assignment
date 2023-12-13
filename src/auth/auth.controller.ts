import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  ConflictException,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dtos/signup.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    const { email } = signUpDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.userService.createUser(signUpDto);
  }
  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    const user = await this.authService.validateUser(
      signInDto.email,
      signInDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.signIn(user);
  }
}
