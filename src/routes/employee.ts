import { Router } from 'express';
import Controller from '../controllers/employee.controller';

const router = Router();

router.get('/all', Controller.fetchAllEmployees);
router.post('/new', Controller.addEmployee);
router.put('/update/:id', Controller.updateEmployee);

export default router;
