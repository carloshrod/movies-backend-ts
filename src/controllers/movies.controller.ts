import type { NextFunction, Request, Response } from 'express';
import {
  findMoviesService,
  createMovieService,
  updateMovieService,
  deleteMovieService,
  findOneMovieService,
  findMoviesByTitleService
} from '../services/movies.services';

const findMovies = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const allMovies = await findMoviesService();

    return res.status(200).json({ movies: allMovies });
  } catch (error: unknown) {
    next(error);
    return undefined;
  }
};

const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const savedMovie = await createMovieService(req);

    return res.status(201).json({
      msg: 'Movie created successfully!',
      savedMovie
    });
  } catch (error) {
    next(error);
    return undefined;
  }
};

const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const updatedMovie = await updateMovieService(req);
    if (!updatedMovie) return res.status(404).json({ message: 'Error updating movie!' });

    return res.status(200).json({
      msg: 'Movie updated successfully!',
      updatedMovie
    });
  } catch (error) {
    next(error);
    return undefined;
  }
};

const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;

    const wasDeleted = await deleteMovieService(id);
    if (!wasDeleted) return res.status(404).json({ msg: 'Error deleting movie!' });

    return res.status(200).json({ msg: 'Movie deleted successfully!' });
  } catch (error) {
    next(error);
    return undefined;
  }
};

const findOneMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const movie = await findOneMovieService(id);
    if (!movie) return res.status(404).json({ msg: 'Movie not found!' });

    return res.json({ movie });
  } catch (error) {
    next(error);
    return undefined;
  }
};

const findMoviesByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.params;
    const foundMovies = await findMoviesByTitleService(title);
    res.json({ foundMovies });
  } catch (error) {
    next(error);
  }
};

export { findMovies, createMovie, updateMovie, deleteMovie, findOneMovie, findMoviesByTitle };
