import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './user.entity';

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
}
