import CreditCard from 'src/credit-card/credit-card.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TransactionStatus from './enum/transaction-status.enum';

@Entity()
class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ default: TransactionStatus.PENDING })
  status: string;

  @JoinColumn()
  @ManyToOne(() => CreditCard)
  credit_card: CreditCard;
}

export default Transaction;
