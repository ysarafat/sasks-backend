import { Schema, model } from 'mongoose';
import { TMemberAddress, TMembers, TMembersName } from './members.interface';

const memberNameSchema = new Schema<TMembersName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const memberAddressSchema = new Schema<TMemberAddress>({
  village: { type: String, required: true },
  union: { type: String, required: true },
  upazila: { type: String, required: true },
  districts: { type: String, required: true },
  postCode: { type: String, required: true },
});
const membersSchema = new Schema<TMembers>({
  name: {
    type: memberNameSchema,
    required: true,
  },
  image: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  designation: { type: String, required: true },
  religion: { type: String, required: true },
  institution: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  permanentAddress: {
    type: memberAddressSchema,
    required: true,
  },
  presentAddress: {
    type: memberAddressSchema,
    required: true,
  },
});

export const Members = model<TMembers>('Member', membersSchema);
