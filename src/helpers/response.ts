import { Response } from '../types';

export default (res: Response, status: number, message: string, data: any, error?: any) => res.status(status).json(error ? { status, message, error } : { status, message, data });
