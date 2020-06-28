import {
  Controller,
  UseGuards,
  HttpStatus,
  Response,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/user.model';
import { AuthGuard } from '@nestjs/passport';
import Login from './interface/login.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async register(
    @Response() res: any,
    @Body() user: UserModel,
  ): Promise<HttpStatus> {
    const result = await this.authService.register(user);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async login(
    @Response() res: any,
    @Body() login: Login,
  ): Promise<HttpStatus> {
    const user = await this.usersService.findByEmail(login.email);
    if (!user) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'User Not Found',
      });
    } else {
      const token = this.authService.createToken(user);
      return res.status(HttpStatus.OK).json(token);
    }
  }
}
