import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}
  async getBalanceByCreditCardNumber(creditcard: string) {
    const creditCardFound = await this.creditCardRepository.findOne({
      where: { number: creditcard },
    });

    if (!creditCardFound) {
      throw new BadRequestException('Cartão não encontrado');
    }

    return creditCardFound.disponible;
  }
}
