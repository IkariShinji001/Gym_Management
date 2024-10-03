import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChartData } from '../interfaces/revenueBills.service.interface';
import { Bills } from '../repositories/bill.entity';
import { Repository } from 'typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from 'src/shared/interfaces/grpc/user/userServiceClient.interface';
import { firstValueFrom } from 'rxjs';
import { ListUsersName } from 'src/shared/interfaces/grpc/user/userService.interface';
import * as moment from 'moment';
import { BillDetail } from '../repositories/billDetail.entity';
import { SerivcePackageClient } from 'src/shared/interfaces/grpc/servicePackage/servicePackageClient.interface';
import { ServicePackagePriceList } from 'src/shared/interfaces/grpc/servicePackage/servicePackage.interface';

@Injectable()
export class RevenueBillsService {
  private userService;
  private servicePackagePriceService;
  constructor(
    @InjectRepository(Bills)
    private billRepository: Repository<Bills>,
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
    @Inject('SERVER') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
    this.servicePackagePriceService =
      this.client.getService<SerivcePackageClient>('ServicePackageService');
  }

  async revenueByDayFromBills(
    startDate: Date,
    endDate: Date,
  ): Promise<ChartData> {
    const maxDays = 6;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference > maxDays) {
      throw new Error(`The selected date range cannot exceed ${maxDays} days.`);
    }

    const days = [];
    const revenuePerDay = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dayStart = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0,
      ); // Beginning of the day
      const dayEnd = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999,
      ); // End of the day

      // Calculate total finalAmount for the specific day
      const revenue = await this.billRepository
        .createQueryBuilder('bill')
        .select('SUM(bill.finalAmount)', 'total')
        .where('bill.status = :status', { status: 'PAID' }) // Only consider paid bills
        .andWhere('bill.createAt BETWEEN :dayStart AND :dayEnd', {
          dayStart,
          dayEnd,
        })
        .getRawOne();
      const totalRevenue = revenue.total || 0; // Ensure 0 if no results

      days.push(dayStart.toLocaleDateString('vi-VN')); // Add formatted date to labels
      revenuePerDay.push(totalRevenue || 0); // Add revenue, defaulting to 0 if none found
    }

    const ChartData = {
      labels: days,
      datasets: [
        {
          data: revenuePerDay,
        },
      ],
    };

    return ChartData;
  }

  async revenueByYearFromBills(year: number): Promise<ChartData> {
    const months = [];
    const countRevenueBill = [];
    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 9999);
      const revenueOfMonth = await this.billRepository
        .createQueryBuilder('bill')
        .select('SUM(bill.finalAmount)', 'total')
        .where('bill.status = :status', { status: 'PAID' })
        .andWhere('bill.createAt BETWEEN :startDate and :endDate', {
          startDate,
          endDate,
        })
        .getRawOne();

      const totalRevenue = revenueOfMonth.total || 0;
      months.push('Tháng ' + month);
      countRevenueBill.push(totalRevenue);
    }

    console.log(countRevenueBill);

    const ChartData = {
      labels: months,
      datasets: [
        {
          data: countRevenueBill,
        },
      ],
    };

    return ChartData;
  }

  async getTop10UsersBySpendingOfYear(year: number) {
    const startOfYear = moment(`${year}-01-01`)
      .startOf('year')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfYear = moment(`${year}-12-31`)
      .endOf('year')
      .format('YYYY-MM-DD HH:mm:ss');
    const topUsersId = await this.billRepository
      .createQueryBuilder('bill')
      .select('bill.userId', 'userId')
      .addSelect('SUM(bill.finalAmount)', 'totalspent')
      .where('bill.createAt BETWEEN :startOfYear and :endOfYear', {
        startOfYear,
        endOfYear,
      })
      .andWhere('bill.status = :status', { status: 'PAID' })
      .groupBy('bill.userId')
      .orderBy('totalspent', 'DESC') // Sắp xếp theo tổng chi tiêu giảm dần
      .addOrderBy('MIN(bill.createAt)', 'ASC') // Sắp xếp theo thời gian tạo tăng dần
      .limit(10)
      .getRawMany();

    if (topUsersId.length === 0) {
      return 0;
    }

    const UsersId = topUsersId.map((user) => {
      return { id: user.userId };
    });

    const listUsersId = {
      ListUsersId: UsersId,
    };

    const nameUsers: ListUsersName = await firstValueFrom(
      this.userService.FindListUsersNameByListUsersId(listUsersId),
    );
    console.log(nameUsers);
    const listUsersName = nameUsers.ListUsersName;
    console.log(listUsersName);
    const labels = listUsersName.map((user) => user.username);
    const data = topUsersId.map((user) => user.totalspent);
    const chartData = {
      labels,
      datasets: [
        {
          data,
        },
      ],
    };

    return chartData;
  }

  async getTop10UsersBySpendingOfMonth(month: number, year: number) {
    const startOfMonth = moment(`${year}-${month}-01`)
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = moment(`${year}-${month}-01`)
      .endOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const topUsersId = await this.billRepository
      .createQueryBuilder('bill')
      .select('bill.userId', 'userId')
      .addSelect('SUM(bill.finalAmount)', 'totalspent')
      .where('bill.createAt BETWEEN :startOfMonth and :endOfMonth', {
        startOfMonth,
        endOfMonth,
      })
      .andWhere('bill.status = :status', { status: 'PAID' })
      .groupBy('bill.userId')
      .orderBy('totalspent', 'DESC') // Sắp xếp theo tổng chi tiêu giảm dần
      .addOrderBy('MIN(bill.createAt)', 'ASC') // Sắp xếp theo thời gian tạo tăng dần
      .limit(10)
      .getRawMany();

    if (topUsersId.length === 0) {
      return 0;
    }

    const UsersId = topUsersId.map((user) => {
      return { id: user.userId };
    });

    console.log(UsersId);

    const listUsersId = {
      ListUsersId: UsersId,
    };

    const nameUsers: ListUsersName = await firstValueFrom(
      this.userService.FindListUsersNameByListUsersId(listUsersId),
    );
    const listUsersName = nameUsers.ListUsersName;
    console.log(listUsersName);
    const labels = listUsersName.map((user) => user.username);
    const data = topUsersId.map((user) => user.totalspent);
    const chartData = {
      labels,
      datasets: [
        {
          data,
        },
      ],
    };

    return chartData;
  }

  async getTopPurchasedPackagesOfYear(year: number) {
    const startOfYear = moment(`${year}-01-01`)
      .startOf('year')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfYear = moment(`${year}-12-31`)
      .endOf('year')
      .format('YYYY-MM-DD HH:mm:ss');
    const topPackages = await this.billDetailRepository
      .createQueryBuilder('billDetail')
      .leftJoin('billDetail.bill', 'bill')
      .select('billDetail.servicePackagePriceId', 'servicePackageId')
      .addSelect('COUNT(billDetail.id)', 'purchasecount')
      .where('bill.createAt BETWEEN :startOfYear and :endOfYear', {
        startOfYear,
        endOfYear,
      })
      .andWhere('bill.status = :status', { status: 'PAID' })
      .groupBy('billDetail.servicePackagePriceId')
      .orderBy('purchasecount', 'DESC')
      .limit(5)
      .getRawMany();
      
    console.log(topPackages);

    if (topPackages.length === 0) {
      return 0;
    }

    const servicePackageIds = topPackages.map((packageService) => {
      return { id: packageService.servicePackageId };
    });

    const listServicePackageIds = {
      servicePackagePriceListIds: servicePackageIds,
    };

    const listServicePackage: ServicePackagePriceList = await firstValueFrom(
      this.servicePackagePriceService.FindServicePackagePriceByListIds(
        listServicePackageIds,
      ),
    );

    const nameServicePackage = listServicePackage.servicePackagePriceList.map(
      (servicePackage) => {
        return {
          nameServicePackage:
            servicePackage.servicePackageName +
            ' ' +
            servicePackage.duration +
            ' ' +
            servicePackage.durationType,
        };
      },
    );

    console.log(nameServicePackage);
    const labels = nameServicePackage.map(
      (packageService) => packageService.nameServicePackage,
    );
    const data = topPackages.map(
      (packageService) => packageService.purchasecount,
    );

    const ChartData = {
      labels,
      datasets: [
        {
          data,
        },
      ],
    };

    return ChartData;
  }

  async getTopPurchasedPackagesOfMonth(month: number, year: number) {
    const startOfMonth = moment(`${year}-${month}-01`)
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = moment(`${year}-${month}-01`)
      .endOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const topPackages = await this.billDetailRepository
      .createQueryBuilder('billDetail')
      .leftJoin('billDetail.bill', 'bill')
      .select('billDetail.servicePackagePriceId', 'servicePackageId')
      .addSelect('COUNT(billDetail.id)', 'purchasecount')
      .where('bill.createAt BETWEEN :startOfMonth and :endOfMonth', {
        startOfMonth,
        endOfMonth,
      })
      .andWhere('bill.status = :status', { status: 'PAID' })
      .groupBy('billDetail.servicePackagePriceId')
      .orderBy('purchasecount', 'DESC')
      .limit(5)
      .getRawMany();

    console.log(topPackages);

    if (topPackages.length === 0) {
      return 0;
    }

    const ServicePackageIds = topPackages.map((servicePackage) => {
      return { id: servicePackage.servicePackageId };
    });
    const listServicePackageIds = {
      servicePackagePriceListIds: ServicePackageIds,
    };
    const ServicePackages: ServicePackagePriceList = await firstValueFrom(
      this.servicePackagePriceService.FindServicePackagePriceByListIds(
        listServicePackageIds,
      ),
    );
    const nameServicePackages = ServicePackages.servicePackagePriceList.map(
      (servicePackage) => {
        return {
          name:
            servicePackage.servicePackageName +
            ' ' +
            servicePackage.duration +
            ' ' +
            servicePackage.durationType,
        };
      },
    );

    const labels = nameServicePackages.map(
      (servicePackage) => servicePackage.name,
    );
    const data = topPackages.map(
      (servicePackage) => servicePackage.purchasecount,
    );

    const ChartData = {
      labels,
      datasets: [{ data }],
    };
    return ChartData;
  }
}
