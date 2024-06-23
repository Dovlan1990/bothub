import { Role } from "src/common/role.enum";

export class UserJwtDataDTO {
  id: number;
  username: string;
  role: Role;
}
