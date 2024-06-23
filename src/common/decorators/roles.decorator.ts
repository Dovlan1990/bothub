import { Reflector } from "@nestjs/core";
import { Role } from "../role.enum";

export const RolesDecorator = Reflector.createDecorator<Role[]>();
export const Roles = (...args: Role[]) => {
  return RolesDecorator(args);
};