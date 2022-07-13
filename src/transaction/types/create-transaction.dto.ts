import { ApiProperty } from '@nestjs/swagger';

class CreateTransactionDTO {
  @ApiProperty({ description: 'Cartão de credito utilizado na compra' })
  credit_card: string;

  @ApiProperty({ description: 'valor utilizado na compra' })
  value: number;
}

export default CreateTransactionDTO;
