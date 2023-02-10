import EmployeeService from '../database/services/employee.service';
import TaskService from '../database/services/task.service';
import response from '../helpers/response';
import { ErrorTypes, Request, Response } from '../types';

class TaskController {
  static async addTask(req: Request, res: Response) {
    try {
      const { title, details, deadline, employee } = req.body;
      const employeeExist = await EmployeeService.findEmployee({ _id: employee });
      if (!employeeExist) return response(res, 404, "Employee doesn't exist", null, ErrorTypes.NotFound);

      const taskAssigned = await TaskService.findTask({ title, employee });
      if (taskAssigned) return response(res, 409, 'This task is already assigned to this user', null, ErrorTypes.Conflict);

      const newTask = await TaskService.addTask({ title, details, deadline, employee });
      return response(res, 201, 'Task assigned successfully', newTask);
    } catch (error) {
      return response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }

  static async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getAllTasks();
      if (!tasks.length) return response(res, 404, 'No tasks data found', null, ErrorTypes.NotFound);

      return response(res, 200, 'All Tasks', tasks);
    } catch (error) {
      return response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }

  static async getUserTasks(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userExists = EmployeeService.findEmployee({ _id: id });
      if (!userExists) return response(res, 404, "User doesn't exist", null, ErrorTypes.NotFound);

      const tasks = await TaskService.getUserTasks(id);
      if (!tasks.length) return response(res, 404, 'No tasks data found', null, ErrorTypes.NotFound);

      return response(res, 200, 'All Tasks', tasks);
    } catch (error) {
      return response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }
}

export default TaskController;
