import argon2 from 'argon2';
import { Response, Router } from 'express';

import User from '../models/User';
import usersValidators from '../middlewares/validators/users';
import usersLimiters from '../middlewares/limiters/users';
import jwtValidators from '../middlewares/validators/jwt';
import validators from '../middlewares/validators';
import envHelpers from '../helpers/env';
import jwtHelpers from '../helpers/jwt';
import RequestError from '../helpers/classes/RequestError';
import imdb from '../config/storage/imdb';
import { LoginRequest, RegisterRequest } from '../models/types/users';
import { JwtPayload } from '../models/types/jwt';

const router = Router();

router.get('/',
  jwtValidators.isValid,

  (req, res) => {
    const jwt = req.jwt!;
    res.send({ message: `Hello, ${jwt.decoded.name}` });
  }
);

router.post('/register',
  usersValidators.createRegisterChain(),
  validators.getValidationResult,

  async (req: RegisterRequest, res: Response) => {
    const body = req.body;

    if (await User.exists({ email: body.email })) {
      throw new RequestError({ message: 'Email has already been taken' });
    }

    const hashedPassword = await argon2.hash(body.password);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    res.status(201).send({ id: user.id });
  },
);

router.post('/login',
  usersLimiters.createLoginRateLimit(),
  usersValidators.createLoginChain(),
  validators.getValidationResult,

  async (req: LoginRequest, res: Response) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });

    if (!user || !await argon2.verify(user.password, body.password)) {
      throw new RequestError({ message: 'Credentials are invalid' });
    }

    const JWT_SECRET = envHelpers.getVariable('JWT_SECRET');
    const JWT_EXPIRES = Number(envHelpers.getVariable('JWT_EXPIRES'));

    const jwtPayload: JwtPayload = {
      sub: user.id.toString(),
      name: user.name,
    };

    const jwt = await jwtHelpers.sign(jwtPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    res.send({ jwt });
  }
);

router.post('/logout',
  jwtValidators.isValid,

  async (req, res) => {
    const jwt = req.jwt!;

    const imdbClient = await imdb.getClient();

    const value = '';
    const key = jwt.encoded;

    const now = Math.floor(Date.now() / 1000);
    const jwtLifeTime = jwt.decoded.exp! - now;

    await imdbClient.set(key, value, {
      expiration: {
        type: 'EX',
        value: jwtLifeTime,
      },
    });

    res.send({ message: 'Jwt has been added to blacklist' });
  }
);

export default router;
