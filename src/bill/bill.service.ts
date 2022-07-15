import { CreditCardService } from './../credit-card/credit-card.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import Bill from './bill.entity';
import { Repository } from 'typeorm';
import { addMonths, startOfMonth, addDays, format } from 'date-fns';

@Injectable()
export class BillService {
  constructor(
    private userService: UserService,
    private creditCardService: CreditCardService,
    @InjectRepository(Bill) private billRepository: Repository<Bill>,
  ) {}
  async createBill() {
    const usersWithoutBill = await this.userService.getUsersWithNoBill();

    usersWithoutBill.forEach(async (user) => {
      const preferedDueDay = await this.creditCardService.getPreferredDueDay(
        user,
      );
      const dueDate = format(
        addDays(startOfMonth(addMonths(new Date(), 1)), preferedDueDay),
        'yyyy-MM-dd',
      );

      await this.billRepository.save(
        this.billRepository.create({
          user,
          dueDate,
        }),
      );
    });
  }
}
