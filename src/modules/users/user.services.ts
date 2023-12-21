import bcrypt from 'bcrypt';
import sizeOf from 'image-size';
import { QueryBuilder } from '../../builder/QueryBuilder';
import accountRegisterConfirmation from '../../emailTemplate/accountRegisterConfirmation';
import CustomError from '../../errors/customError';
import { generateRandomPassword } from '../../utils/generateRandomPassword';
import { generateUserId } from '../../utils/generateUserId';
import { sendEmail } from '../../utils/sendEmail';
import { Clouddinary } from '../../utils/uploadToCloudinary';
import { searchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';
// register user
const registerUser = async (image: any, payload: TUser) => {
  if (!image) {
    throw new CustomError(400, 'Member image is required!');
  }

  const dimensions = sizeOf(image.buffer);
  if (dimensions.height !== 500 && dimensions.width !== 500) {
    throw new CustomError(400, 'Image dimensions must be 500x500 or smaller!');
  }

  // generate random password
  const password = generateRandomPassword();

  // password hashing
  const hashPassword = await bcrypt.hash(password, 10);

  // generate user id
  payload.userId = await generateUserId(payload.role || 'user');

  // upload image to cloudDinary
  const clouddinaryFolderName = 'users-image';
  const clouddinaryFileName =
    payload.name.firstName + '_' + payload.name.lastName;
  const clouddinaryFileTransformation = {
    width: 500,
    height: 500,
    crop: 'fill',
  };
  payload.image = await Clouddinary.uploadFileToCloud(
    image,
    clouddinaryFolderName,
    clouddinaryFileName,
    clouddinaryFileTransformation,
  );

  const result = await User.create({ ...payload, password: hashPassword });
  if (result) {
    const emailSubject = 'Your user account is register successfully';
    const emailTemplate = accountRegisterConfirmation(result.userId, password);
    await sendEmail(result.email, emailSubject, emailTemplate);
  }
  return result;
};

// get all user
const getAllUser = async (query: any) => {
  const queryUser = new QueryBuilder(User.find(), query)
    .isDeleted(false)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await queryUser.modelQuery;
  return result;
};

// get single user
const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

// update user
const updateUser = async (id: string, payload: Partial<TUser>) => {
  const { name, ...other } = payload;
  const updatedData: Record<string, unknown> = {
    ...other,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value;
    }
  }
  const result = await User.findByIdAndUpdate(id, updatedData, { new: true });
  return result;
};

// delete user
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const UserServices = {
  registerUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
