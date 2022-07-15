import { CreditCardService } from './../credit-card/credit-card.service';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import BillTask from './bill.task';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bill from './bill.entity';
import { User } from 'src/user/user.entity';
import { Solicitation } from '../credit-card/solicitation.entity';
import CreditCard from 'src/credit-card/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, User, Solicitation, CreditCard])],
  controllers: [BillController],
  providers: [BillService, BillTask, UserService, CreditCardService],
})
export class BillModule {}
