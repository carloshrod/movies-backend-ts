import { Router } from 'express';
import {
  findMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  findOneMovie,
  findMoviesByTitle
} from '../controllers/movies.controller';
import uploadFile from '../middlewares/uploadFile';
import { validateMovie } from '../validators/movies.validator';

const movieRoutes = Router();

movieRoutes.get('/', findMovies);
movieRoutes.post('/', uploadFile, validateMovie, createMovie);
movieRoutes.put('/:id', uploadFile, validateMovie, updateMovie);
movieRoutes.delete('/:id', deleteMovie);
movieRoutes.get('/:id', findOneMovie);
movieRoutes.get('/search/:title', findMoviesByTitle);

export default movieRoutes;
