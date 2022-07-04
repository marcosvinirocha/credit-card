import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitation } from './solicitation.entity';

@ApiTags('solicitação')
@Controller('credit-card')
export class CreditCardController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
  ) {}
  @Post('request')
  async request(@Body() creditCardRequest: CreditCardRequestDTO) {
    const user = await this.userRepository.save(
      this.userRepository.create({
        name: creditCardRequest.name,
        cpf: creditCardRequest.cpf,
        email: creditCardRequest.email,
        password: creditCardRequest.password,
      }),
    );

    await this.solicitationRepository.save(
      this.solicitationRepository.create({
        preferredDueDay: creditCardRequest.preferredDueDay,
        user: user,
        status: 'APPROVED',
      }),
    );
    console.log(creditCardRequest);
    console.log(await this.userRepository.find());

    return {
      approved: true,
    };
  }
}
