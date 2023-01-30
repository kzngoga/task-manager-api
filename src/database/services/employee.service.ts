import Employee, { EmployeeInput } from '../models/employee.model';

interface FindOneInterface {
  email?: string;
  _id?: string;
}

class EmployeeService {
  static async addEmployee(newBus: EmployeeInput) {
    try {
      return await Employee.create(newBus);
    } catch (error) {
      throw error;
    }
  }

  static async getAllEmployees() {
    try {
      return await Employee.find();
    } catch (error) {
      throw error;
    }
  }

  static async findEmployee(employee: FindOneInterface) {
    try {
      return await Employee.findOne(employee);
    } catch (error) {
      throw error;
    }
  }

  static async updateEmployee(filter: { _id: string }, updateBody: any) {
    try {
      return await Employee.findOneAndUpdate(filter, updateBody, { new: true });
    } catch (error) {
      throw error;
    }
  }
}

export default EmployeeService;
