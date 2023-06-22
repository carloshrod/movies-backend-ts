import { deleteImage, uploadImage } from '../utils/cloudinary';
import { findMoviePoster } from './movies.services';
import type { Poster } from '../types';
import type fileUpload from 'express-fileupload';
import type { FileArray } from 'express-fileupload';
import type { Request } from 'express';
import deleteTempFiles from '../utils/deleteTempFiles';

const setPoster = async (files: FileArray | null | undefined): Promise<Poster> => {
  const posterFile = files?.poster as fileUpload.UploadedFile;
  const image = posterFile && (await uploadImage(posterFile?.tempFilePath));
  await deleteTempFiles();

  const poster: Poster = {
    url: image?.secure_url,
    id: image?.public_id
  };

  return poster;
};

const updatePoster = async (req: Request): Promise<Poster> => {
  const { id } = req.params;
  const { files } = req;
  const moviePoster = await findMoviePoster(id);

  const posterFile = files?.poster as fileUpload.UploadedFile;
  const image = posterFile && (await uploadImage(posterFile.tempFilePath));
  if (posterFile && moviePoster.id) {
    await deleteImage(moviePoster?.id);
  }
  await deleteTempFiles();

  const poster: Poster = {
    url: image?.secure_url ?? moviePoster?.url,
    id: image?.public_id ?? moviePoster?.id
  };

  return poster;
};

export { setPoster, updatePoster };
