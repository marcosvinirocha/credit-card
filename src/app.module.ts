import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardModule } from './credit-card/credit-card.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Solicitation } from './credit-card/solicitation.entity';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '92318491',
      database: 'creditcard',
      entities: [User, Solicitation],
      synchronize: true,
    }),
    CreditCardModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
