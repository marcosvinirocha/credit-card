import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}

//toda vez que for fazer  injenção de depedencias deve add o modulo correspondente para funcionar
