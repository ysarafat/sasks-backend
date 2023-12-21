export type TUserName = {
  firstName: string;
  lastName: string;
};
export type TUser = {
  userId: string;
  name: TUserName;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin' | 'superAdmin';
  status: 'active' | 'blocked';
  image?: string;
  isDeleted: boolean;
  needPasswordChange: boolean;
  passwordUpdateAt: Date;
};
