import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDTO } from './dto/user-create.dto';
import { Role } from 'src/common/role.enum';
import { User } from 'prisma/model/user.model.';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: UserCreateDTO): Promise<User> {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    return this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
        role: Role.USER,
      },
    });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.users.findUnique({ where: { username } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async updateUserRole(id: number, role: number): Promise<User> {
    return this.prisma.users.update({
      where: { id },
      data: { role },
    });
  }

  hasRole(user: User, role: Role): boolean {
    return (user.role & role) === role;
  }
}
