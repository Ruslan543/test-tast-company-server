import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserDocument } from "src/user/user.model";
import { TypeRoles } from "../types/role.type";
import { ROLE_METADATA_KEY } from "../decorators/auth.decorator";

export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<TypeRoles[]>(
      ROLE_METADATA_KEY,
      context.getHandler(),
    );
    if (!roles.length) return true;

    const request = context.switchToHttp().getRequest();
    const user: UserDocument = request.user;

    if (!user) {
      throw new ForbiddenException("No user found");
    }

    const hasRole = roles.some((role) => user.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException("Access denied");
    }

    return true;
  }
}
