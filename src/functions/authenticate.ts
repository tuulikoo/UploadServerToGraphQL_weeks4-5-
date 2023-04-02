import {NextFunction, Request, Response} from 'express';
import CustomError from '../classes/CustomError';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check that user is in auth server
    const response = await fetch(`${process.env.AUTH_URL}/users/token`, {
      headers: {Authorization: req.headers.authorization as string},
    });
    if (!response.ok) {
      next(new CustomError('Authentication failed', 401));
      return;
    }
    next();
  } catch (error) {
    next(new CustomError('Authentication failed', 401));
    return;
  }
};
