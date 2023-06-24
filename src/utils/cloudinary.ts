import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import config from '../config';

const { cloud } = config;

cloudinary.config({
  cloud_name: cloud.name,
  api_key: cloud.api_key,
  api_secret: cloud.api_secret,
  secure: true
});

export const uploadImage = async (filePath: string): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'app-movies-posters'
  });
};

export const deleteImage = async (publicId: string): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.destroy(publicId);
};
