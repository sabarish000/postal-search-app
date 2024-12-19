export interface User {
  username: string;
  password?: string;
  token: string | undefined;
  role: UserRole;
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Employee = 'employee',
  Guest = 'guest',
}
