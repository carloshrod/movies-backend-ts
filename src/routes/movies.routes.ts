import { Router } from 'express';
import {
  findMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  findOneMovie,
  findMoviesByTitle
} from '../controllers/movies.controller';
import { uploadFile, validateRequest } from '../middlewares';
import { validateMovie } from '../validators/movies.validator';

const movieRoutes = Router();

movieRoutes.get('/', findMovies);
movieRoutes.post('/', [uploadFile, validateRequest], validateMovie, createMovie);
movieRoutes.put('/:id', [uploadFile, validateRequest], validateMovie, updateMovie);
movieRoutes.delete('/:id', validateRequest, deleteMovie);
movieRoutes.get('/:id', findOneMovie);
movieRoutes.get('/search/:title', findMoviesByTitle);

export default movieRoutes;
