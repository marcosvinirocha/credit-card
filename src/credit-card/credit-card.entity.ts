import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Brands from './enum/brands.enum';
import { User } from '../user/user.entity';
import Transaction from 'src/transaction/transaction.entity';

@Entity()
class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 50 })
  limit: number;

  @Column({ type: 'float', default: 50 })
  disponible: number;

  @Column()
  number: string;

  @Column({ default: Brands.VISA })
  brand: Brands;

  @Column({ type: 'timestamp' })
  valid_until: Date;

  @Column({ length: 3 })
  cvv: string;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.credit_card)
  transactions: Transaction[];
}

export default CreditCard;
