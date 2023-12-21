import axios from 'axios';
import config from '../config';
import CustomError from '../errors/customError';
export const sendSMS = async (sentTo: string, SMS: string) => {
  try {
    const otpVerify = new URLSearchParams();
    otpVerify.append('token', config.sms_api!);
    otpVerify.append('to', `${sentTo}`);
    otpVerify.append('message', SMS);
    const response = await axios.post(config.sms_url!, otpVerify);
    const { status } = response.data[0];
    return status;
  } catch (error) {
    throw new CustomError(500, 'Failed to send sms ');
  }
};
