import { Router } from 'express';
import employeeRoutes from './employee';
import adminRoutes from './admin';

const router = Router();

router.use('/employees', employeeRoutes);
router.use('/admin', adminRoutes);

export default router;