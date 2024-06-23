import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Param,
  Put,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { Role } from 'src/common/role.enum';
import { Authorization } from 'src/common/decorators/authorization.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserLoginDTO } from './dto/user-login.dto';
import { RequestBH } from 'src/common/request';
import { ApiTags } from '@nestjs/swagger';
import { UniversalResponseInterceptor } from 'src/common/interceptors/universal-response.interceptor';
import { UniversalResponse } from 'src/common/decorators/universal-response.decorator';
import { User } from 'prisma/model/user.model.';
import { UserRoleUpdate } from './dto/user-role.dto';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
@UseInterceptors(UniversalResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UniversalResponse(User)
  async register(@Body() body: UserCreateDTO) {
    return this.usersService.createUser(body);
  }

  @Post('login')
  @UniversalResponse(User)
  async login(@Body() loginUserDto: UserLoginDTO) {
    const user = await this.usersService.validateUser(loginUserDto.username, loginUserDto.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.usersService.login(user);
  }

  @Get('me')
  @Authorization()
  @UniversalResponse(User)
  getMe(@Req() req: RequestBH) {
    return this.usersService.getUserById(req.user!.id);
  }

  @Put(':id/role')
  @Roles(Role.ADMIN)
  @Authorization()
  @UniversalResponse(User)
  async updateRole(@Param('id') id: number, @Body() updateUserRoleDto: UserRoleUpdate) {
    return this.usersService.updateUserRole(id, updateUserRoleDto.role);
  }
}
