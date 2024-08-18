export interface AdminEmail {
  email: string;
}

export interface Admin {
  id: number;
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
}
