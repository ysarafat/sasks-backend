import axios from 'axios';
import config from '../config';
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
    console.error('Error sending OTP:', error);
  }
};
