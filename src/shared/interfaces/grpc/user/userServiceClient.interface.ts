import { Observable } from 'rxjs';
import {
  CustomerStripeId,
  User,
  UserId,
  Username,
} from './userService.interface';

export interface UserServiceClient {
  FindOneUserByUsername(username: Username): Observable<User>;
  FindOneUserById(userId: UserId): Observable<CustomerStripeId>;
}
