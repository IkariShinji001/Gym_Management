// config/database.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as fs from 'fs';
import { join } from 'path';
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
        ca: `
-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUXX0SYXYBlLpMn5twUXylOl6g4C0wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZTBkOTJhMTQtYTY3OS00YTY4LTk1YzMtM2NlOTgwOTNm
OWY4IFByb2plY3QgQ0EwHhcNMjQwOTI3MDMzMzIwWhcNMzQwOTI1MDMzMzIwWjA6
MTgwNgYDVQQDDC9lMGQ5MmExNC1hNjc5LTRhNjgtOTVjMy0zY2U5ODA5M2Y5Zjgg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKwHo8sp
3M5DNHt2TaptncB8d4cSm+GewEIWq63aRV8GYGH2DVsdOBVa1sdLUWDBliiGnIyR
5ITimmWhGWzZ+/AnVQvvsoyh90MoFXGwhAWWJDgMmmPgvfpVMMzEWX22eG6Dd/HX
B+7xo4X8eckYE/o+7c1W/+SIwpvN1UOmwndxHJ8QVIRzBsMuXmnCf/tfh2oxjE9p
q02MAQ+XfDgRnzd8zV8mcRKvdSr2q2EKzXK8nBEWxHdmOVhzyM1w1DsFwWouO9Rx
8fIc43Jrq/PLBjJUp7czwQTkiC0sOvWHz7XtBvdQRqjcH0oiThogpy9nAMnamMgg
hSj0ZrMcOY4n/zz4n3cBnDz7THiWhWdqMgmBMbFbR/F8gMB4tJtLj7roekejvoUV
iUFlswy+FVDZC7yDVdggzq7URqzARLap6W837U0uuMHqMakvCWlUf3y7EaRHBUzh
SPkmYEah8RBOrtZNz5+LS/g4w1QCFSIEXfn2MlrolIP9MZ5u72DgcA/oIQIDAQAB
oz8wPTAdBgNVHQ4EFgQU9W3tvPzl9Ti9GBPWY0QrOTPTkUEwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJZsIa3SZngSG/vm
LqiAIgg10kvePuvoM2ipi7t2oUec/uZQKTxP4B2F3472/uPfEHLm7TTWvvHZTYoL
f1VmFzMBseBXZB3e7KAsWqdzJs3n92y2qLuoXLkrqDZo1HOmK7l9XKClFKtOfEiI
+t8Nq17K4S1PgcdqhDIVT4hgyBic1wzaZ7W0Wpz6eqHOi8ukZa1nr4rLe4Y90Z1F
MWyMNNccTK6SotPH5TY/SqRbhsp7E1hxWhPBBBn5f4LBpTU3R289g18wA8VKMcDu
RpwLcxRyO1uLTFTNU7++/x7AHdbQFZGeTU4/J9cthblIdA7R08vyWFumv3X9XKKW
euH2pSaTj9CNNz3ry9k9BfZXpom9WtKJ/8BMxJTfrG0ZgFIQMtQXqkDOMq3FmGvO
HDp6+AVt+HorM9jb5pYvy/ZirWpSb5AIH4A7ZIayHVD2988z6ayfefsFGIODFMC/
qaiFSngCS8rsfmn/UbibUQo+N4MY59B0BTa86EyLHQn8GF+8KQ==
-----END CERTIFICATE-----`,
      },
    };
  }
}
