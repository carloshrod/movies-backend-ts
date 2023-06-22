import pool from '../database/db';
import type { Request } from 'express';
import type { MovieEntry, NewMovieEntry, Poster } from '../types';
import { setPoster, updatePoster } from './files.services';
import { deleteImage } from '../utils/cloudinary';

const findMovies = async (): Promise<MovieEntry[]> => {
  const result = await pool.query('SELECT * FROM movies ORDER BY release_date desc');
  const movies: MovieEntry[] = result.rows;

  return movies;
};

const createMovie = async (req: Request): Promise<MovieEntry> => {
  const newMovieEntry: NewMovieEntry = req.body;
  const poster = await setPoster(req.files);

  const result = await pool.query(
    `INSERT INTO movies (title, language, rating, duration, release_date, 
              trailer, sinopsis, director, casting, poster) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [
      newMovieEntry.title,
      newMovieEntry.language,
      newMovieEntry.rating,
      newMovieEntry.duration,
      newMovieEntry.release_date,
      newMovieEntry.trailer,
      newMovieEntry.sinopsis,
      newMovieEntry.director,
      newMovieEntry.casting,
      poster
    ]
  );
  const createdMovie: MovieEntry = result.rows[0];

  return createdMovie;
};

const updateMovie = async (req: Request): Promise<MovieEntry> => {
  const movieToUpdateEntry: NewMovieEntry = req.body;
  const poster = await updatePoster(req);
  const updated_at = new Date();
  const { id } = req.params;

  const result = await pool.query(
    `UPDATE movies SET title = $1, language = $2, rating = $3, duration = $4, release_date = $5,
      trailer = $6, sinopsis = $7, director = $8, casting = $9, poster = $10, updated_at = $11 WHERE id = $12 RETURNING *`,
    [
      movieToUpdateEntry.title,
      movieToUpdateEntry.language,
      movieToUpdateEntry.rating,
      movieToUpdateEntry.duration,
      movieToUpdateEntry.release_date,
      movieToUpdateEntry.trailer,
      movieToUpdateEntry.sinopsis,
      movieToUpdateEntry.director,
      movieToUpdateEntry.casting,
      poster,
      updated_at,
      id
    ]
  );
  const updatedMovie: MovieEntry = result.rows[0];

  return updatedMovie;
};

const deleteMovie = async (id: string): Promise<boolean> => {
  const poster_idResult = await pool.query(
    `SELECT poster->>'id' AS poster_id FROM movies WHERE id = $1`,
    [id]
  );
  const result = await pool.query('DELETE FROM movies WHERE id = $1', [id]);
  const wasDeleted: boolean = result.rowCount === 1;

  if (wasDeleted) {
    const { poster_id } = poster_idResult.rows[0];
    await deleteImage(poster_id);
  }

  return wasDeleted;
};

const findOneMovie = async (id: string): Promise<MovieEntry> => {
  const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
  const foundMovie: MovieEntry = result.rows[0];

  return foundMovie;
};

const findMoviesByTitle = async (title: string): Promise<MovieEntry[]> => {
  const result = await pool.query(
    'SELECT * FROM movies WHERE UPPER(title) LIKE UPPER($1) ORDER BY release_date desc',
    [`%${title}%`]
  );
  const foundMovies: MovieEntry[] = result.rows;

  return foundMovies;
};

const findMoviePoster = async (id: string): Promise<Poster> => {
  const result = await pool.query('SELECT poster FROM movies WHERE id = $1', [id]);
  const poster: Poster = result.rows[0].poster;

  return poster;
};

const findMovieByUniqueKey = async (title: string, trailer: string): Promise<MovieEntry> => {
  const result = await pool.query('SELECT * FROM movies WHERE title = $1 OR trailer = $2', [
    title,
    trailer
  ]);
  const foundMovie: MovieEntry = result.rows[0];

  return foundMovie;
};

export {
  findMovies as findMoviesService,
  createMovie as createMovieService,
  updateMovie as updateMovieService,
  deleteMovie as deleteMovieService,
  findOneMovie as findOneMovieService,
  findMoviesByTitle as findMoviesByTitleService,
  findMoviePoster,
  findMovieByUniqueKey
};
