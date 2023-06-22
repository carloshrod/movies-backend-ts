import type { Language, Rating } from './enums';

export interface Poster {
  url: string;
  id: string;
}

export interface MovieEntry {
  id: string;
  title: string;
  language: Language;
  rating: Rating;
  duration: number;
  release_date: string;
  trailer: string;
  sinopsis: string;
  director: string;
  casting: string;
  poster: Poster;
  created_at: Date;
  updated_at: Date;
}

export type NewMovieEntry = Omit<MovieEntry, ['id', 'poster', 'created_at', 'updated_at']>;
