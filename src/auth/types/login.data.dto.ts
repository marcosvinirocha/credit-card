import { ApiProperty } from '@nestjs/swagger';

class LoginDataDTO {
  @ApiProperty({
    description: 'Email do usuario',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do Usuario',
  })
  password: string;
}

export default LoginDataDTO;
