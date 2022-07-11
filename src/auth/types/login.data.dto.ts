import { ApiProperty } from '@nestjs/swagger';

class LoginDataDTO {
  @ApiProperty({
    description: 'Dia do pagamento da fatura',
  })
  email: string;

  @ApiProperty({
    description: 'Dia do pagamento da fatura',
  })
  password: string;
}

export default LoginDataDTO;
