import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    username?: string;
    name?: string;
    sub?: number; // kalau kamu pakai sub di JWT
  };
}
