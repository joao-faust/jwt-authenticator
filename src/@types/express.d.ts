import * as express from 'express';
import { JwtPayload } from '../models/types/jwt';

declare global {
  namespace Express {
    interface Request {
      jwt?: {
        decoded: JwtPayload;
        encoded: string;
      };
    }
  }
}
