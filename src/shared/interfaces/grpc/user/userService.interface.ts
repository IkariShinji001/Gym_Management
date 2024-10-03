export interface Username {
  username: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface UserId {
  id: number;
}

export interface CustomerStripeId {
  customerStripeId: string;
}

export interface ListUsersId {
  ListUsersId: UserId[];
}

export interface ListUsersName {
  ListUsersName: Username[];
}
