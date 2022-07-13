import { Module } from '@nestjs/common';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Transaction from 'src/transaction/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [StatementController],
  providers: [StatementService],
})
export class StatementModule {}
