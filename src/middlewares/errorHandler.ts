import type { Response } from 'express';
import deleteTempFiles from '../utils/deleteTempFiles';

const ERRORS: any = {
  '23505': (res: Response) =>
    res.status(409).send({ msg: 'There is already a movie with this title or trailer!' }),
  '22P02': (res: Response) => res.status(400).send({ msg: 'Invalid uuid!' }),
  defaultError: (res: Response) =>
    res.status(500).send({ msg: 'Something went wrong. Please try it later!' }).end()
};

const errorHandler = async (
  error: any,
  _req: any,
  res: Response,
  _next: any
): Promise<Response | undefined> => {
  try {
    await deleteTempFiles();
    console.log(error);
    if (error.code) {
      const handler = ERRORS[error.code] || ERRORS.defaultError;
      return handler(res, error);
    }
    return res.status(400).send({ msg: error.message });
  } catch (err) {
    console.error(err);
  }
};

export default errorHandler;
