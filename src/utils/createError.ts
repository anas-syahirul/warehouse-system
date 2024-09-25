import { Request, Response } from 'express';
import { logger } from './logger';

export const createError = (
  res: Response,
  error: any,
  model: string,
  operation: string
) => {
  if (error instanceof Error) {
    logger.error(`ERR: ${model} - ${operation} = ${error.message}`);
    return res
      .status(500)
      .send({ status: false, statusCode: 500, message: error.message });
  } else {
    logger.error(`ERR: ${model} - ${operation} = ${error}`);
    return res
      .status(500)
      .send({ status: false, statusCode: 500, message: error });
  }
};
