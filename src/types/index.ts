export { Request, Response } from 'express';

export enum ErrorTypes {
  NotFound = 'NOT_FOUND',
  Conflict = 'CONFLICT_ERROR',
  Server = 'SERVER_ERROR',
  Bad = 'BAD_REQUEST',
}
