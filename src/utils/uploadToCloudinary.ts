/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary, { UploadApiOptions, UploadApiResponse } from 'cloudinary';

type TTransformation = {
  width: number;
  height: number;
  crop: string;
};
interface CloudinaryUploadOptions {
  folder: string;
  use_filename: boolean;
  public_id: string;
  transformation: TTransformation[];
  resource_type: string;
}

const uploadFileToCloud = async (
  file: any,
  folderName: string,
  fileName: string,
  transformation: TTransformation,
) => {
  const base64Image = file.buffer.toString('base64');
  const dataUri = `data:${file.mimetype};base64,${base64Image}`;

  const options: CloudinaryUploadOptions = {
    folder: folderName,
    use_filename: true,
    public_id: `${fileName?.split(' ')?.join('_')}_${Date.now()}`.toLowerCase(),
    transformation: [transformation],
    resource_type: 'image',
  };

  const cloudinaryResponse = await cloudinary.v2.uploader.upload(
    dataUri,
    options as UploadApiOptions,
  );

  const fileURL = (cloudinaryResponse as UploadApiResponse).secure_url;
  return fileURL;
};

export const Clouddinary = { uploadFileToCloud };
