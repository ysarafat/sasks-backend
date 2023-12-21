import clouddinary from 'cloudinary';
import config from '.';

export function clouddinaryConfig() {
  clouddinary.v2.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
}
