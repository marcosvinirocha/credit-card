import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = this.userService.showUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const match = await bcrypt.compare(password, (await user).password);

    if (match) {
      const payload = { email, sub: (await user).id };
      return {
        token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
