import { z } from 'zod';

// Define Zod subtypes
const memberNameValidationSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const memberAddressValidationSchema = z.object({
  village: z.string(),
  union: z.string(),
  upazila: z.string(),
  district: z.string(),
  division: z.string(),
  postCode: z.string(),
});

// Define Zod main type
const membersValidationSchema = z.object({
  name: memberNameValidationSchema,
  image: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  gender: z.enum(['male', 'female']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  dateOfBirth: z.string(),
  degree: z.string(),
  designation: z.string(),
  religion: z.string(),
  institution: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  permanentAddress: memberAddressValidationSchema,
  presentAddress: memberAddressValidationSchema,
});

export const MemberValidation = { membersValidationSchema };
