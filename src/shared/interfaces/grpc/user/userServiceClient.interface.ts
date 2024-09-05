import { Observable } from 'rxjs';
import { User, Username } from './userService.interface';

export interface UserServiceClient {
  FindOneUserByUsername(username: Username): Observable<User>;
}
