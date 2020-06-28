import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { RegistrationStatus } from './interface/registration-status.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserModel } from 'src/users/user.model';
import { IToken } from './interface/token.interface';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async register(user: UserModel): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.register(user);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }

  createToken(user: User): IToken {
    const expiresIn = 3600;
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      jwtConstants.secret,
      { expiresIn },
    );
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<User> {
    return await this.usersService.findById(payload.id);
  }

  async validateUser(email: string, password: string): Promise<UserModel> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.comparePassword(password)) {
      this.logger.log('password check success');
      const { id, password, ...result } = user;
      return result;
    }
    return null;
  }
}
