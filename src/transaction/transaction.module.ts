import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Transaction from 'src/transaction/transaction.entity';
import CreditCard from 'src/credit-card/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, CreditCard])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

//typeormModule injeta os modulos que vai usar no service
