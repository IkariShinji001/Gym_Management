import { Observable } from 'rxjs';
import {
  CustomerStripeId,
  ListUsersId,
  ListUsersName,
  User,
  UserId,
  Username,
} from './userService.interface';

export interface UserServiceClient {
  FindOneUserByUsername(username: Username): Observable<User>;
  FindOneUserById(userId: UserId): Observable<CustomerStripeId>;
  FindListUsersNameByListUsersId(ListUsersId: ListUsersId): Observable<ListUsersName>
}