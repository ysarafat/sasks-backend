export type TMembersName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TMemberAddress = {
  village: string;
  union: string;
  upazila: string;
  districts: string;
  division: string;
  postCode: string;
};
export type TMembers = {
  name: TMembersName;
  image?: string;
  email: string;
  contactNo: string;
  gender: 'male' | 'female';
  bloodGroup: TBloodGroup;
  dateOfBirth: string;
  designation: string;
  religion: string;
  institution: string;
  fatherName: string;
  motherName: string;
  permanentAddress: TMemberAddress;
  presentAddress: TMemberAddress;
  isDeleted: boolean;
};
