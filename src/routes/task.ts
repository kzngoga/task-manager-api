import { Router } from 'express';
import Controller from '../controllers/task.controller';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/all', [Authorization.isAdmin], Controller.getAllTasks);
router.get('/for/:id', [Authorization.isAdmin], Controller.getUserTasks);

router.post('/new', [Authorization.isAdmin], Controller.addTask);

export default router;
