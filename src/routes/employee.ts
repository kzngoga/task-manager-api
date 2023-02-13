import { Router } from 'express';
import Controller from '../controllers/employee.controller';
import * as Validations from '../middlewares/validation/employee/employee.validations';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/all', [Authorization.isAdmin], Controller.fetchAllEmployees);
router.get('/:id', [Authorization.isAdmin], Controller.getEmployee);

router.post('/new', [Authorization.isAdmin, Validations.addEmployee], Controller.addEmployee);

router.put('/update/:id', [Authorization.isAdmin, Validations.updateEmployee], Controller.updateEmployee);

export default router;
