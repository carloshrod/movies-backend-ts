import type { Handler } from 'express';
import {
  findMoviesService,
  createMovieService,
  updateMovieService,
  deleteMovieService,
  findOneMovieService,
  findMoviesByTitleService
} from '../services/movies.services';

const findMovies: Handler = async (_req, res, next) => {
  try {
    const allMovies = await findMoviesService();

    if (allMovies.length === 0) return res.status(204).send();

    return res.status(200).json(allMovies);
  } catch (error) {
    next(error);
  }
};

const createMovie: Handler = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new Error('No file uploaded!');
    }

    const savedMovie = await createMovieService(req);

    return res.status(201).json(savedMovie);
  } catch (error) {
    next(error);
  }
};

const updateMovie: Handler = async (req, res, next) => {
  try {
    const updatedMovie = await updateMovieService(req);
    if (!updatedMovie) return res.status(204).send();

    return res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie: Handler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const wasDeleted = await deleteMovieService(id);
    if (!wasDeleted) return res.status(204).send();

    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const findOneMovie: Handler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await findOneMovieService(id);
    if (!movie) return res.status(204).send();

    return res.json(movie);
  } catch (error) {
    next(error);
  }
};

const findMoviesByTitle: Handler = async (req, res, next) => {
  try {
    const { title } = req.params;
    const foundMovies = await findMoviesByTitleService(title);

    if (foundMovies.length === 0) return res.status(204).send();

    return res.status(200).json(foundMovies);
  } catch (error) {
    next(error);
  }
};

export { findMovies, createMovie, updateMovie, deleteMovie, findOneMovie, findMoviesByTitle };
