import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface EmployeeInput {
  name: string;
  phone: string;
  email: string;
  isManager: boolean;
}

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isManager: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: 'employees',
    timestamps: true,
  }
);

export default mongoose.model('Employee', EmployeeSchema);
