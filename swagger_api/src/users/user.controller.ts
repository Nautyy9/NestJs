import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update_user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({ path: 'users' })
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: CreateUserDTO): Promise<User> {
    return this.userService.create(user);
  }
  @Get()
  findAll(userDto: CreateUserDTO): Promise<User[]> {
    return this.userService.findAll(userDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, user);
  }
}
