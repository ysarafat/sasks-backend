import sizeOf from 'image-size';

import { addMemberConfirmation } from '../../emailTemplate/addMemberConfirmation';
import CustomError from '../../errors/customError';
import { sendEmail } from '../../utils/sendEmail';
import { sendSMS } from '../../utils/sendSMS';
import { Clouddinary } from '../../utils/uploadToCloudinary';
import { TMembers } from './members.interface';
import { Members } from './members.model';
// create member service
const createMember = async (image: any, payload: TMembers) => {
  if (!image) {
    throw new CustomError(400, 'Member image is required!');
  }

  const dimensions = sizeOf(image.buffer);
  if (dimensions.height !== 500 && dimensions.width !== 500) {
    throw new CustomError(400, 'Image dimensions must be 500x500 or smaller!');
  }

  // upload image to cloudDinary
  const clouddinaryFolderName = 'Members-image';
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
  // return stored data from db
  if (payload.image) {
    const result = await Members.create(payload);
    const emailSubject = 'Your member profile is published on sasks.org';
    const emailTemplate = addMemberConfirmation(result);

    await sendEmail(result?.email, emailSubject, emailTemplate);
    const smsBody = `Hello ${result?.name?.lastName}, Great news! Your profile information has just been added to sasks.org, We've also sent you an email for confirmation. Kindly check your inbox to ensure your details are accurate. Thank you for being a part of sasks.org! 🚀`;
    await sendSMS(result.contactNo, smsBody);
    return result;
  }
};

export const MemberServices = { createMember };
