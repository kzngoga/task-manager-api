import { Router } from 'express';
import employeeRoutes from './employee';

const router = Router();

router.use('/employees', employeeRoutes);

export default router;