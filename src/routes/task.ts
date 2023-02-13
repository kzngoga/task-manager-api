import { Router } from 'express';
import Controller from '../controllers/task.controller';
import * as Authorization from '../middlewares/authorization';
import * as Validations from '../middlewares/validation/task/task.validations';

const router = Router();

router.get('/all', [Authorization.isAdmin], Controller.getAllTasks);
router.get('/for/:id', [Authorization.isAdmin], Controller.getUserTasks);

router.post('/new', [Authorization.isAdmin, Validations.addTask], Controller.addTask);

router.put('/update/:id', [Authorization.isAdmin, Validations.updateTask], Controller.updateTask);

router.delete('/delete/:id', [Authorization.isAdmin], Controller.deleteTask);

export default router;
