import { Router } from 'express';
import employeeRoutes from './employee';
import adminRoutes from './admin';
import taskRoutes from './task';

const router = Router();

router.use('/employees', employeeRoutes);
router.use('/admin', adminRoutes);
router.use('/tasks', taskRoutes);

export default router;
