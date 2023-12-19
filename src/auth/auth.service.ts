import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { User } from '../user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signIn(user: any): Promise<{ access_token: string }> {
    console.log(user);
    const payload = { email: user.email, role: user.role, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
