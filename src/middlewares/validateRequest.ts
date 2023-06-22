import type { NextFunction, Request, Response } from 'express';
import { findOneMovieService } from '../services/movies.services';

const validateRequest = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.files && !id) {
      throw new Error('No file uploaded!');
    }

    if (id) {
      const movieToHandle = await findOneMovieService(id);
      if (!movieToHandle) throw new Error('Movie to handle not found!');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateRequest;
