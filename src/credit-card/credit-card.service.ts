import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import { User } from '../user/user.entity';
import { Solicitation } from './solicitation.entity';
import { Repository } from 'typeorm';
import SolicitationStatus from './enum/solicitation-status.enum';
import { UserService } from '../user/user.service';
import CreditCard from './credit-card.entity';
import { addYears } from 'date-fns';
import Brands from './enum/brands.enum';
import generateCreditCard from '../credit-card/helpers/generate-credit-card.helper';
import UserStatus from 'src/user/enum/user-status.enum';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
    private userService: UserService,
  ) {}
  async createSolicitation(creditCardRequest: CreditCardRequestDTO) {
    const score = this.requestScore();
    const approved = score >= 600;
    const userExists = await this.userService.verifyIfUserExists(
      creditCardRequest.email,
      creditCardRequest.cpf,
    );

    if (userExists) {
      throw new BadRequestException('Usuario already exists');
    }
    const user = await this.userService.createUser({
      email: creditCardRequest.email,
      name: creditCardRequest.name,
      password: creditCardRequest.password,
      cpf: creditCardRequest.cpf,
      status: approved ? UserStatus.ENABLED : UserStatus.DISABLED,
    });

    await this.solicitationRepository.save(
      this.solicitationRepository.create({
        preferredDueDay: creditCardRequest.preferredDueDay,
        user: user,
        status: approved
          ? SolicitationStatus.APPROVED
          : SolicitationStatus.DENIED,
      }),
    );

    if (approved) {
      this.generateCreditCardApproved(user);
    }

    return approved;
  }

  async getPreferredDueDay(user: User) {
    const solicitation = await this.solicitationRepository.findOne({
      where: {
        user: user,
        status: SolicitationStatus.APPROVED,
      },
    });
    return solicitation.preferredDueDay;
  }

  private async generateCreditCardApproved(user: User) {
    const DEFAULT_BRAND = Brands.VISA;

    return await this.creditCardRepository.save(
      this.creditCardRepository.create({
        valid_until: addYears(new Date(), 5),
        number: generateCreditCard(DEFAULT_BRAND),
        cvv: '000',
        brand: DEFAULT_BRAND,
        user,
      }),
    );
  }

  private requestScore() {
    return this.randomintFromInterval(0, 1000);
  }

  private randomintFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
