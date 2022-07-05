import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Solicitation } from './solicitation.entity';
import { CreditCardService } from './credit-card.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Solicitation])],
  controllers: [CreditCardController],
  exports: [TypeOrmModule],
  providers: [CreditCardService, UserService],
})
export class CreditCardModule {}
