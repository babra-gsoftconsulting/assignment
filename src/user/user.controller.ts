import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/roles/role.decorator';
import { UserService } from './user.service';
import { RolesGuard } from 'src/common/roles/role.guards';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('role')
  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  test() {
    return this.userService.test();
  }
}
