import { check, validationResult } from 'express-validator';
import { Language, Rating } from '../enums';
import type { NextFunction, Request, Response } from 'express';

// Utils
const validateResult = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const error = new Error('Validation error!');
    res.status(400).send({ errors: errors.array() });
    next(error);
  }
};

const isNotEmpty = (value: string): boolean => {
  if (!value || value.trim().length === 0) {
    throw new Error('Field required!');
  }
  return true;
};

const isURLWithProtocol = (value: string): boolean => {
  const regex = /^(https?:\/\/)/;
  if (!regex.test(value)) {
    throw new Error('URL must start with "http://" or "https://"!');
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
    .withMessage('Invalid language!'),
  check('rating')
    .exists()
    .custom(isNotEmpty)
    .isString()
    .isIn(Object.values(Rating))
    .withMessage('Invalid rating!'),
  check('duration')
    .exists()
    .custom(isNotEmpty)
    .isInt({ min: 1, max: 999, allow_leading_zeroes: false })
    .withMessage('Must be a number between 1 and 999. No leading zeros!'),
  check('release_date')
    .exists()
    .custom(isNotEmpty)
    .isDate()
    .withMessage('Must be a valid date format!'),
  check('trailer')
    .exists()
    .custom(isNotEmpty)
    .isURL()
    .withMessage('Must be a valid URL!')
    .custom(isURLWithProtocol),
  check('sinopsis').exists().custom(isNotEmpty).isString(),
  check('director').exists().custom(isNotEmpty).isString(),
  check('casting').exists().custom(isNotEmpty).isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];

export { validateMovie };
