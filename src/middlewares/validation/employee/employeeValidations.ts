import { Request, Response, NextFunction } from './../../../types/index';
import validator from '../../../helpers/validator';
import addEmployeeSchema from './schemas/addEmployeeSchema';
import updateEmployeeSchema from './schemas/updateEmployeeSchema';

export const addEmployee = (req: Request, res: Response, next: NextFunction) => validator(addEmployeeSchema, req.body, res, next);
export const updateEmployee = (req: Request, res: Response, next: NextFunction) => validator(updateEmployeeSchema, req.body, res, next);
