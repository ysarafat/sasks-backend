import { userRole } from './user.constant';

export type TUserName = {
  firstName: string;
  lastName: string;
};
export type TUserRole = keyof typeof userRole;

export type TUser = {
  userId: string;
  name: TUserName;
  email: string;
  phone: string;
  password: string;
  role: TUserRole;
  status: 'active' | 'blocked';
  image?: string;
  isDeleted: boolean;
  needPasswordChange: boolean;
  passwordUpdateAt: Date;
};
