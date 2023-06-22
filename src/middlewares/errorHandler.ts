import type { NextFunction, Request, Response } from 'express';
import deleteTempFiles from '../utils/deleteTempFiles';

const ERRORS: any = {
  '23505': (res: Response) =>
    res.status(400).send({ msg: 'There is already a movie with this title or trailer!' }),
  '42P01': (res: Response) => res.status(400).send({ msg: 'Database error!' }),
  '42703': (res: Response) => res.status(500).send({ msg: 'Internal server error!' }),
  defaultError: (res: Response) =>
    res.status(500).send({ msg: 'Unknown error. Please try it later!' }).end()
};

const errorHandler = async (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  console.error(error);
  await deleteTempFiles();
  if (error.code) {
    const handler = ERRORS[error.code] || ERRORS.defaultError;
    return handler(res, error);
  }
  return res.status(400).send({ msg: error.message });
};

export default errorHandler;
