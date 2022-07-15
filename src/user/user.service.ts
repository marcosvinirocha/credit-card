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

  async verifyIfUserExists(email, cpf) {
    const foundUserByEmail = await this.findUserByEmail(email);
    const foundUserByCpf = await this.findUserByCpf(cpf);

    return foundUserByEmail.length > 0 || foundUserByCpf.length > 0;
  }

  async getUsersWithNoBill() {
    const query = await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('bill', 'b', 'b.userId = u.id')
      .where('b.id is null');

    return query.getMany();
  }

  private findUserByEmail(email: string) {
    return this.userRepository.find({ where: { email: email } });
  }
  private findUserByCpf(cpf: string) {
    return this.userRepository.find({ where: { cpf: cpf } });
  }

  async showUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  private async encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
