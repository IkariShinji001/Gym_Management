import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/userService.interface';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../repositories/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }
  async createUser(newUser: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create(newUser);
    return await this.userRepository.save(createdUser);
  }
  updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
