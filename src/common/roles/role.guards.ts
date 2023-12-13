// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(Roles, context.getHandler());

    if (!roles) {
      return true; // No roles defined, access granted by default
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && user.role && roles.some((role) => user.role.includes(role));
  }
}
