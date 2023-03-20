import EmployeeService from '../database/services/employee.service';
import response from '../helpers/response';
import { ErrorTypes, Request, Response } from '../types';

class EmployeeController {
  static async fetchAllEmployees(req: Request, res: Response) {
    try {
      const employeeData = await EmployeeService.getAllEmployees();
      if (!employeeData.length) return response(res, 404, 'No Employees Registered yet', null, ErrorTypes.NotFound);
      return response(res, 200, 'All Employees', employeeData);
    } catch (error) {
      return response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }

  static async addEmployee(req: Request, res: Response) {
    try {
      const { email, isManager, name, phone } = req.body;
      const employeeExist = await EmployeeService.findEmployee({ email });
      if (employeeExist) return response(res, 409, 'Employee exists already', null, ErrorTypes.Conflict);
      const newEmployee = await EmployeeService.addEmployee({ email, isManager, name, phone });
      return response(res, 201, 'Employee Registered', newEmployee);
    } catch (error) {
      return response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }

  static async updateEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email } = req.body;
      const employeeExist = await EmployeeService.findEmployee({ _id: id });
      if (!employeeExist) return response(res, 404, 'Employee does not exist', null, ErrorTypes.NotFound);

      if (email) {
        const emailExists = await EmployeeService.findEmployee({ email });
        if (emailExists) return response(res, 409, 'Employee with same email already exists', null, ErrorTypes.Conflict);
      }
      const updatedEmployee = await EmployeeService.updateEmployee({ _id: id }, req.body);
      return response(res, 200, 'Employee Updated', updatedEmployee);
    } catch (error) {
      return response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }

  static async getEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const employeeData = await EmployeeService.findEmployee({ _id: id });
      if (!employeeData) return response(res, 404, 'Employee does not exist', null, ErrorTypes.NotFound);
      return response(res, 200, 'Employee Details', employeeData);
    } catch (error) {
      return response(res, 500, error.message || error, null, ErrorTypes.Server);
    }
  }
}

export default EmployeeController;
