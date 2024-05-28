import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  findOwn(@Req() req: Request & { user: User }) {
    return req.user;
  }

  @Patch('me')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request & { user: User },
  ) {
    return await this.usersService.updateById(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  async getOwnWishes(@Req() req: Request & { user: User }) {
    return await this.wishesService.findByUserId(req.user.id);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findByUsername(username, false);
  }

  @Get(':username/wishes')
  getWishes(@Param('username') username: string) {
    return this.wishesService.findByUserName(username);
  }

  @Post('find')
  findMany(@Body() findUserDto: FindUserDto) {
    return this.usersService.findUser(findUserDto.query);
  }
}
