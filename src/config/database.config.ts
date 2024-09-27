// config/database.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      ssl: {
        rejectUnauthorized: true,
        ca: `MIIEQTCCAqmgAwIBAgIUXX0SYXYBlLpMn5twUXylOl6g4C0wDQYJKoZIhvcNAQEMBQAwOjE4MDYGA1UEAwwvZTBkOTJhMTQtYTY3OS00YTY4LTk1YzMtM2NlOTgwOTNmOWY4IFByb2plY3QgQ0EwHhcNMjQwOTI3MDMzMzIwWhcNMzQwOTI1MDMzMzIwWjA6MTgwNgYDVQQDDC9lMGQ5MmExNC1hNjc5LTRhNjgtOTVjMy0zY2U5ODA5M2Y5ZjggUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKwHo8sp3M5DNHt2TaptncB8d4cSm+GewEIWq63aRV8GYGH2DVsdOBVa1sdLUWDBliiGnIyR5ITimmWhGWzZ+/AnVQvvsoyh90MoFXGwhAWWJDgMmmPgvfpVMMzEWX22eG6Dd/HXB+7xo4X8eckYE/o+7c1W/+SIwpvN1UOmwndxHJ8QVIRzBsMuXmnCf/tfh2oxjE9pq02MAQ+XfDgRnzd8zV8mcRKvdSr2q2EKzXK8nBEWxHdmOVhzyM1w1DsFwWouO9Rx8fIc43Jrq/PLBjJUp7czwQTkiC0sOvWHz7XtBvdQRqjcH0oiThogpy9nAMnamMgghSj0ZrMcOY4n/zz4n3cBnDz7THiWhWdqMgmBMbFbR/F8gMB4tJtLj7roekejvoUViUFlswy+FVDZC7yDVdggzq7URqzARLap6W837U0uuMHqMakvCWlUf3y7EaRHBUzhSPkmYEah8RBOrtZNz5+LS/g4w1QCFSIEXfn2MlrolIP9MZ5u72DgcA/oIQIDAQABoz8wPTAdBgNVHQ4EFgQU9W3tvPzl9Ti9GBPWY0QrOTPTkUEwDwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJZsIa3SZngSG/vmLqiAIgg10kvePuvoM2ipi7t2oUec/uZQKTxP4B2F3472/uPfEHLm7TTWvvHZTYoLf1VmFzMBseBXZB3e7KAsWqdzJs3n92y2qLuoXLkrqDZo1HOmK7l9XKClFKtOfEiI+t8Nq17K4S1PgcdqhDIVT4hgyBic1wzaZ7W0Wpz6eqHOi8ukZa1nr4rLe4Y90Z1FMWyMNNccTK6SotPH5TY/SqRbhsp7E1hxWhPBBBn5f4LBpTU3R289g18wA8VKMcDuRpwLcxRyO1uLTFTNU7++/x7AHdbQFZGeTU4/J9cthblIdA7R08vyWFumv3X9XKKWeuH2pSaTj9CNNz3ry9k9BfZXpom9WtKJ/8BMxJTfrG0ZgFIQMtQXqkDOMq3FmGvOHDp6+AVt+HorM9jb5pYvy/ZirWpSb5AIH4A7ZIayHVD2988z6ayfefsFGIODFMC/qaiFSngCS8rsfmn/UbibUQo+N4MY59B0BTa86EyLHQn8GF+8KQ==`,
      },
    };
  }
}
