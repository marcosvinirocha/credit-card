import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import UserDTO from './types/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(user: UserDTO) {
    const encryptedPassword = await this.encryptPassword(user.password);
    const userEntity = this.userRepository.create({
      ...user,
      password: encryptedPassword,
    });
    return await this.userRepository.save(userEntity);
  }

  private async encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
