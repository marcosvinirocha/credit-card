import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import StatementFilterDTO from './types/statement-filter.dto';
import Transaction from 'src/transaction/transaction.entity';
import { Repository } from 'typeorm';
import PaginatedResultDTO from 'src/types/paginated-result.dto';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  async paginate(params: StatementFilterDTO) {
    const { page, limit, from, to } = params;
    const queryBuilder =
      this.transactionRepository.createQueryBuilder('transaction');
    const skip = page * limit;
    const [result, total] = await queryBuilder
      .where('transaction.date between :from and :to', {
        from,
        to,
      })
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return new PaginatedResultDTO<Transaction>(
      result,
      page,
      total,
      result.length,
    );
  }
}
