import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import RequestError from '../../helpers/classes/RequestError';

function getValidationResult(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array();
    throw new RequestError({ message: errors[0].msg });
  }
  next();
}

function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(err);

  if (err instanceof RequestError) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'Internal Error' });
}

export default {
  getValidationResult,
  handleErrors,
};
