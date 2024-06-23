import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { RolesDecorator } from '../decorators/roles.decorator';
import { RequestBH } from '../request';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(RolesDecorator, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const request: RequestBH = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.role) {
      return false;
    }

    return requiredRoles.some((role) => user.role & role);
  }
}
