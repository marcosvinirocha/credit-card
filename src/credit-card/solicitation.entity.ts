import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Solicitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  status: string;

  @Column()
  preferredDueDay: number;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
