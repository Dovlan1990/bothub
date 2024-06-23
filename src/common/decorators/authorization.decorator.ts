import { UseGuards, applyDecorators } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";

export const Authorization = ()=>UseGuards(JwtAuthGuard, RolesGuard)