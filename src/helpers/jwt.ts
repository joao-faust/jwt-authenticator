import jwt from 'jsonwebtoken';
import RequestError from './classes/RequestError';

function sign(
  payload: object,
  secret: string,
  options: jwt.SignOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, encoded) => {
      if (err) {
        return reject(err);
      };

      if (!encoded) {
        return reject(new RequestError({
          message: 'Cannot encode jwt',
          status: 500,
        }));
      }

      resolve(encoded);
    });
  });
}

function verify<T>(encoded: string, secret: string): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.verify(encoded, secret, {}, (err, decoded) => {
      if (err) return reject(err);

      if (!decoded || typeof decoded === 'string') {
        return reject(new RequestError({
          message: 'Cannot decode jwt',
          status: 500,
        }));
      }

      resolve(decoded as T);
    });
  });
}

export default {
  sign,
  verify,
};
