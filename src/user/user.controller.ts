import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/common/roles/role.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,){}

    @Get('role')
    @Roles(['admin'])
    test() {
      return this.userService.test();
    }
}
