import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async finfAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: { id: number }) {
    return this.userService.create(createUserDto);
  }
}
