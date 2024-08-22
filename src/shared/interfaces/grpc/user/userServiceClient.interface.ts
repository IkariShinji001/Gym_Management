import { Observable } from 'rxjs';
import { User, UserEmail } from './userService.interface';

export interface UserServiceClient {
  FindOneUserByEmail(email: UserEmail): Observable<User>;
}
