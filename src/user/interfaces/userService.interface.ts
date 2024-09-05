import { User } from '../repositories/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { HistoryEntryTime } from '../repositories/historyEntryTime.entity';
export interface IUserService {
  findOneByUserId(id: number): Promise<User>;
  findOneByUsername(username: string): Promise<User>;
  createUser(newUser: CreateUserDto): Promise<User>;
  updateUser(id: number, updateUser: UpdateUserDto): Promise<User>;
  deleteUser(id: number): Promise<void>;
  getAllEntryTimeByUserId(
    id: number,
    startDate: Date,
    endDate: Date,
  ): Promise<HistoryEntryTime[]>;
}
