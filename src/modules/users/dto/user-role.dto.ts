import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../common/role.enum';
import { IsEnum } from 'class-validator';

export class UserRoleUpdate {
  @IsEnum(Role)
  @ApiProperty()
  role: Role;
}
