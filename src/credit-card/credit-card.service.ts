import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import { User } from '../user/user.entity';
import { Solicitation } from './solicitation.entity';
import { Repository } from 'typeorm';
import SolicitationStatus from './enum/solicitation-status.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
    private userService: UserService,
  ) {}
  async createSolicitation(creditCardRequest: CreditCardRequestDTO) {
    const user = await this.userService.createUser({
      email: creditCardRequest.email,
      name: creditCardRequest.name,
      password: creditCardRequest.password,
      cpf: creditCardRequest.cpf,
    });
    const score = this.requestScore();
    const approved = score >= 600;

    await this.solicitationRepository.save(
      this.solicitationRepository.create({
        preferredDueDay: creditCardRequest.preferredDueDay,
        user: user,
        status: approved
          ? SolicitationStatus.APPROVED
          : SolicitationStatus.DENIED,
      }),
    );

    return approved;
  }

  private requestScore() {
    return this.randomintFromInterval(0, 1000);
  }

  private randomintFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
