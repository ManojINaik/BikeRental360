import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        message: 'A record with this value already exists'
      });
    }
  }

  return res.status(500).json({
    message: 'Internal server error'
  });
}