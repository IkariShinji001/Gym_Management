import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService, ListUsersId } from '../interfaces/userService.interface';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../repositories/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HistoryEntryTime } from '../repositories/historyEntryTime.entity';
import * as moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { EmailService } from 'src/mail/service/mail.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService implements IUserService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(HistoryEntryTime)
    private historyEntryTimeRepository: Repository<HistoryEntryTime>,
    private configService: ConfigService,
    private EmailService: EmailService
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'));
  }

  async findOneByUserId(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getAllEntryTimeByUserId(
    id: number,
    startDate: Date,
    endDate: Date,
  ): Promise<HistoryEntryTime[]> {
    // Tạo ngày kết thúc bao gồm toàn bộ ngày (23:59:59.999)
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Tìm người dùng và lọc các bản ghi theo ngày
    const user = await this.findOneByUserId(id);
    if (!user) {
      throw new Error('User not found');
    }

    const results = await this.historyEntryTimeRepository
      .createQueryBuilder('entry')
      .where('entry.user_id = :userId', { userId: id })
      .andWhere('entry.entry_time >= :startDate', {
        startDate: startDate.toISOString(),
      })
      .andWhere('entry.entry_time <= :endDate', {
        endDate: endOfDay.toISOString(),
      })
      .getMany();

    return results;
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async FindListUsersNameByListUsersId(listUsersId: ListUsersId) {
    const userIds = listUsersId.ListUsersId.map((user) => user.id);
    console.log(userIds);
    //Truy vấn để lấy dánh sách tên user dựa trên userId
    const usersName = await this.userRepository
      .createQueryBuilder('user')
      .select('user.fullName', 'username')
      .addSelect('user.id', 'id')
      .where('user.id IN (:...userIds)', { userIds })
      .getRawMany();

    // Sắp xếp lại mảng usersName dựa trên thứ tự của userIds
    const sortedUsersName = userIds.map((id) =>
      usersName.find((user) => user.id === id),
    );
    console.log(sortedUsersName);
    console.log(usersName);
    const listUsersName = {
      ListUsersName: sortedUsersName,
    };
    return listUsersName;
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    const existedUser = await this.findOneByUsername(newUser.username);

    if (existedUser) {
      throw new HttpException('Đã tồn tại username', HttpStatus.BAD_REQUEST);
    }

    newUser.password = hashedPassword;

    const stripeCustomer = await this.stripe.customers.create({
      name: newUser.fullName,
      email: newUser.email,
    });

    const user = { ...newUser, customerStripeId: stripeCustomer.id };

    const createdUser = this.userRepository.create(user);

    return await this.userRepository.save(createdUser);
  }

  async updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUser);
    return await this.userRepository.findOne({ where: { id } });
  }

  async sendMailResetPassword(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        'Không tìm thấy người dùng',
        HttpStatus.NOT_FOUND,
      );
    }
    const token = await this.EmailService.generateToken(user.id); // Generate token
    await this.EmailService.sendMailResetPassword(email, token); // Send reset password email
  }

  async changePassword(
    id: number,
    password: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Không tìm thấy người dùng', HttpStatus.BAD_REQUEST);
    }
    const isMatch =  bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu không chính xác!');
       
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    user.password = hashedPassword;
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id } });
  }

  async updatePassword(id: number, newPassword: string): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    await this.userRepository.update(id, { password: hashedPassword });
    return await this.userRepository.findOne({ where: { id } });
  }

  async updatePasswordWithToken(token: string, newPassword: string): Promise<void> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const decoded = jwt.verify(token, secret) as { userId: number };
      const user = await this.userRepository.findOne({ where: { id: decoded.userId } });
      if (!user) {
        throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      await this.userRepository.update(decoded.userId, { password: hashedPassword });
    } catch (error) {
      throw new HttpException('Token không hợp lệ hoặc đã hết hạn', HttpStatus.BAD_REQUEST);
    }
  }
  deleteUser(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
