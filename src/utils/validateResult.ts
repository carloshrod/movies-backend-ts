import type { Handler } from 'express';
import { validationResult } from 'express-validator';

const validateResult: Handler = (req, _res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const { msg } = errors.array()[0];
    const error = new Error(msg);
    next(error);
  }
};

export default validateResult;
