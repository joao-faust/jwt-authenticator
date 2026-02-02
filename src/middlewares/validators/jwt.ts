import { JsonWebTokenError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import envHelpers from '../../helpers/env';
import jwtHelpers from '../../helpers/jwt';
import RequestError from '../../helpers/classes/RequestError';
import imdb from '../../config/storage/imdb';
import { JwtPayload } from '../../models/types/jwt';

async function isValid(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    throw new RequestError({ message: 'No jwt provided', status: 401 });
  }

  const encoded = authorizationHeader.replace('Bearer ', '');
  const JWT_SECRET = envHelpers.getVariable('JWT_SECRET');

  try {
    const decoded = await jwtHelpers.verify<JwtPayload>(
      encoded,
      JWT_SECRET
    );

    const imdbClient = await imdb.getClient();

    if (await imdbClient.exists(encoded)) {
      throw new RequestError({
        message: 'Jwt is in blacklist',
        status: 401
      });
    }

    req.jwt = {
      decoded,
      encoded,
    };

    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw new RequestError({ message: 'Invalid jwt', status: 401 });
    }
    next(err);
  }
}

export default {
  isValid,
};
