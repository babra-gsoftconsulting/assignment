import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/common/roles/role.decorator';
import { UserService } from './user.service';
import { RolesGuard } from 'src/common/roles/role.guards';
import { AuthGuard } from '@nestjs/passport';
import { User } from './models/user.model';
import { CustomInterceptors } from 'src/common/interceptors/dataTransform.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('role')
  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  test() {
    return this.userService.test();
  }

  @Get('getByEmail')
  @UseInterceptors(CustomInterceptors)
  findByAll(@Query('email') email:string): Promise<User>{
    return this.userService.findByEmail(email);

  }
}
