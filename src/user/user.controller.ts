import {
  Controller,
  Get,
  Query,
  Headers,
  UseGuards,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { Roles } from 'src/common/roles/role.decorator';
import { UserService } from './user.service';
import { RolesGuard } from 'src/common/roles/role.guards';
import { AuthGuard } from '@nestjs/passport';
import { User } from './models/user.model';
import { CustomInterceptors } from 'src/common/interceptors/dataTransform.interceptor';
import { I18n, I18nContext } from 'nestjs-i18n';

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
  // @UseInterceptors(CustomInterceptors)
  async findByEmail(@Query('email') email: string): Promise<User> {
    return await this.userService.findByEmail(email);
  }

  @Get('internationalization')
  getHello(@I18n() i18n: I18nContext) {
    return i18n.t(`test.here`);
  }
}
