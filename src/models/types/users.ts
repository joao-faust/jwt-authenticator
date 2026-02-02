import { Request } from 'express';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
};

export interface LoginData {
  email: string;
  password: string;
};

export type RegisterRequest = Request<unknown, unknown, RegisterData>;
export type LoginRequest = Request<unknown, unknown, LoginData>;
