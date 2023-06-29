import { check } from 'express-validator';
import validateResult from '../utils/validateResult';
import { Language, Rating } from '../enums';
import type { Meta } from 'express-validator';
import type { NextFunction, Request, Response } from 'express';

// Custom validators
const isNotEmpty = (value: string, meta: Meta): boolean => {
  if (!value || value.trim().length === 0) {
    throw new Error(`Field "${meta.path}" is required`);
  }
  return true;
};

const isValidURL = (value: string): boolean => {
  const regex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
  if (!regex.test(value)) {
    throw new Error('Field "trailer" must be a valid URL. Ex: https://valid-url.com');
  }
  return true;
};

// Validators
const validateMovie = [
  check('title').exists().custom(isNotEmpty).isString(),
  check('language')
    .exists()
    .custom(isNotEmpty)
    .isString()
    .isIn(Object.values(Language))
    .withMessage('Invalid language'),
  check('rating')
    .exists()
    .custom(isNotEmpty)
    .isString()
    .isIn(Object.values(Rating))
    .withMessage('Invalid rating'),
  check('duration')
    .exists()
    .custom(isNotEmpty)
    .isInt({ min: 1, max: 999, allow_leading_zeroes: false })
    .withMessage('Field "duration" must be a number between 1 and 999. No leading zeros'),
  check('release_date')
    .exists()
    .custom(isNotEmpty)
    .isDate()
    .withMessage('Field "release date" must be a valid date format'),
  check('trailer').exists().custom(isNotEmpty).custom(isValidURL),
  check('sinopsis').exists().custom(isNotEmpty).isString(),
  check('director').exists().custom(isNotEmpty).isString(),
  check('casting').exists().custom(isNotEmpty).isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];

export { validateMovie };
