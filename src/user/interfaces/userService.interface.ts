import { User } from '../repositories/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
export interface IUserService {
  findOneByUsername(username: string): Promise<User>;
  createUser(newUser: CreateUserDto): Promise<User>;
  updateUser(id: number, updateUser: UpdateUserDto): Promise<User>;
  deleteUser(id: number): Promise<void>;
}
