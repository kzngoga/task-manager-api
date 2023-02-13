import { NextFunction } from 'express';
import { Request, Response } from './../../../types/index';
import validator from '../../../helpers/validator';
import addTaskSchema from './schemas/addTaskSchema';
import updateTaskSchema from './schemas/updateTaskSchema';

export const addTask = (req: Request, res: Response, next: NextFunction) => validator(addTaskSchema, req.body, res, next);
export const updateTask = (req: Request, res: Response, next: NextFunction) => validator(updateTaskSchema, req.body, res, next);
