import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Solicitation } from './solicitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Solicitation])],
  controllers: [CreditCardController],
  exports: [TypeOrmModule],
})
export class CreditCardModule {}
