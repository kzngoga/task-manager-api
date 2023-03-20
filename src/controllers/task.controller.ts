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
      if (!userExists) return response(res, 404, "Employee doesn't exist", null, ErrorTypes.NotFound);

      const tasks = await TaskService.getUserTasks(id);
      if (!tasks.length) return response(res, 404, 'No tasks data found', null, ErrorTypes.NotFound);

      const employeeData = tasks[0]?.employee;
      const formattedTasks = tasks.map((task) => {
        const newTask = task;
        newTask.employee = undefined;
        newTask.__v = undefined;

        return newTask;
      });

      const formattedResponse = {
        employee: employeeData,
        tasks: formattedTasks,
      };
      return response(res, 200, 'All Tasks', formattedResponse);
    } catch (error) {
      return response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const taskExists = TaskService.findTask({ _id: id });
      if (!taskExists) return response(res, 404, "Task doesn't exit", null, ErrorTypes.NotFound);

      await TaskService.deleteTask(id);
      return response(res, 200, 'Task Deleted', null);
    } catch (error) {
      response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { employee, title } = req.body;
      const taskExists = await TaskService.findTask({ _id: id });
      if (!taskExists) return response(res, 404, "Task doesn't exist", null, ErrorTypes.NotFound);

      if (employee) {
        const employeeExist = await EmployeeService.findEmployee({ _id: employee });
        if (!employeeExist) return response(res, 404, "Employee doesn't exist", null, ErrorTypes.NotFound);
      }

      if (employee && title) {
        const taskAssigned = await TaskService.findTask({ title, employee });
        if (taskAssigned) return response(res, 409, 'This task is already assigned to this employee', null, ErrorTypes.Conflict);
      }

      if (!employee && title) {
        const taskAssigned = await TaskService.findTask({ title, employee: taskExists.employee.toString() });
        if (taskAssigned) return response(res, 409, 'This task is already assigned to this employee', null, ErrorTypes.Conflict);
      }

      const updateTask = await TaskService.updateTask({ _id: id }, req.body);

      return response(res, 200, 'Task updated', updateTask);
    } catch (error) {
      response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }
}

export default TaskController;
