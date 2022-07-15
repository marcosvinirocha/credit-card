import { BillService } from './bill.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
class BillTask {
  constructor(private billService: BillService) {}
  private readonly logger = new Logger(BillTask.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleBillsGeneraton() {
    this.logger.debug('All Bills are generated');
    this.billService.createBill();
  }
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleBillsUpdateAmountAndMinimal() {
    this.logger.debug('All values are updated');
  }
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleBillsUpdate() {
    this.logger.debug('All status are updated');
  }
}

export default BillTask;
