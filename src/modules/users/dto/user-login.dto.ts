import { OmitType } from '@nestjs/swagger';
import { UserCreateDTO } from './user-create.dto';

export class UserLoginDTO extends OmitType(UserCreateDTO, ['email']) {}
