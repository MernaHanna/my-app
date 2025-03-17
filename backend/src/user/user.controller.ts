import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('signup')
  async signup(@Body() body: { name: string, email: string; password: string }) {
    return this.userService.register(body.name, body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@Req() req) {
    return this.userService.findUser(req.user.userId);
  }
}