import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateTransactionDTO from './types/create-transaction.dto';
import Transaction from 'src/transaction/transaction.entity';
import { Repository } from 'typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}
  async createTransaction(createTransactionDto: CreateTransactionDTO) {
    const { credit_card } = createTransactionDto;

    const creditCard = await this.creditCardRepository.findOne({
      where: { number: credit_card },
    });

    if (!creditCard) {
      throw new BadRequestException('cartao de credito não existe');
    }

    const hasLimit = creditCard.limit >= createTransactionDto.value;
    if (!hasLimit) {
      throw new BadRequestException('Não há limite disponivel');
    }

    const entity = this.transactionRepository.create({
      date: new Date().toISOString(),
      value: createTransactionDto.value,
      credit_card: creditCard,
    });

    this.creditCardRepository.update(creditCard.id, {
      disponible: creditCard.disponible - createTransactionDto.value,
    });
    return this.transactionRepository.save(entity);
  }
}
