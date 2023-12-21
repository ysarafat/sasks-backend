import multer from 'multer';
import CustomError from '../errors/customError';

export const multerUpload = (fileSize: number, acceptFile: string[]) => {
  const acceptedFileTypes = new Set(acceptFile);

  const multerConfig = multer({
    limits: { fileSize: fileSize * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (acceptedFileTypes.has(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new CustomError(
            400,
            'Only .png, .jpg, and .jpeg formats are allowed!',
          ),
        );
      }
    },
  });

  return multerConfig;
};
