import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import SolicitationStatus from './enum/solicitation-status.enum';

@Entity()
export class Solicitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  status: SolicitationStatus;

  @Column()
  preferredDueDay: number;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
