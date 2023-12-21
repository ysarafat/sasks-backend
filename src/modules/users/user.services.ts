import bcrypt from 'bcrypt';
import sizeOf from 'image-size';
import accountRegisterConfirmation from '../../emailTemplate/accountRegisterConfirmation';
import CustomError from '../../errors/customError';
import { generateRandomPassword } from '../../utils/generateRandomPassword';
import { generateUserId } from '../../utils/generateUserId';
import { sendEmail } from '../../utils/sendEmail';
import { Clouddinary } from '../../utils/uploadToCloudinary';
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

export const UserServices = { registerUser };
