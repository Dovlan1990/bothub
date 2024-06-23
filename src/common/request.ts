import { Request } from 'express';
import { UserJwtDataDTO } from 'src/modules/users/dto/user-jwt-data.dto';

export class RequestBH extends Request {
  user?: UserJwtDataDTO;
}
