import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import config from '../config/config';

const { CLOUD } = config;

cloudinary.config({
  cloud_name: CLOUD.NAME,
  api_key: CLOUD.API_KEY,
  api_secret: CLOUD.API_SECRET,
  secure: true
});

export const uploadImage = async (filePath: string): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    folder: CLOUD.FOLDER
  });
};

export const deleteImage = async (publicId: string): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.destroy(publicId);
};
