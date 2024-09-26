import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/userService.interface';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../repositories/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HistoryEntryTime } from '../repositories/historyEntryTime.entity';
import * as moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PageOptionsDto } from 'src/shared/dto/page.options.dto';
import { PageDto } from 'src/shared/dto/page.dto';
import { PageMetaDto } from 'src/shared/dto/pageMeta.dto';

@Injectable()
export class UserService implements IUserService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(HistoryEntryTime)
    private historyEntryTimeRepository: Repository<HistoryEntryTime>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'));
  }

  async getAllEmail(): Promise<User[]> {
    return await this.userRepository.find({ select: ['email'] });
  }

  async getAllUserEmailPerPage(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder
      .select(['user.email', 'user.fullName', 'user.gender']) // Use double quotes
      .orderBy('"user"."email"', pageOptionsDto.order) // Use validated order
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getAllUserEmailPerPageByGender(
    pageOptionsDto: PageOptionsDto,
    gender: boolean
  ): Promise<PageDto<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder
      .select(['user.email', 'user.fullName', 'user.gender']) // Use double quotes
      .where('user.gender = :gender', {gender})
      .orderBy('"user"."email"', pageOptionsDto.order) // Use validated order
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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
  updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
