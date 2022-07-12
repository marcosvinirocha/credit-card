import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import UserStatus from 'src/user/enum/user-status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  status: UserStatus;
}
