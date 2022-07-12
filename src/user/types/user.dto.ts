import UserStatus from 'src/user/enum/user-status.enum';
class UserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  status: UserStatus;
}

export default UserDTO;
