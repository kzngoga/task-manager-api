import Task, { TaskInput } from './../models/task.model';

interface FindOneInterface {
  title?: string;
  employee?: string;
  _id?: string;
}

class TaskService {
  static async addTask(newTask: TaskInput) {
    try {
      return await Task.create(newTask);
    } catch (error) {
      throw error;
    }
  }
  static async findTask(taskDetails: FindOneInterface) {
    try {
      return await Task.findOne(taskDetails);
    } catch (error) {
      throw error;
    }
  }
  static async getAllTasks() {
    try {
      return await Task.find().populate({ path: 'employee', select: 'name email isManager' });
    } catch (error) {
      throw error;
    }
  }
  static async getUserTasks(employee: string) {
    try {
      return await Task.find({ employee }).populate({ path: 'employee', select: 'name email isManager' });
    } catch (error) {
      throw error;
    }
  }
}

export default TaskService;
