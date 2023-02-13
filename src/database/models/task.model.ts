import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface TaskInput {
  title: string;
  details: string;
  deadline: number;
  employee: string;
}

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    deadline: {
      type: Number,
      required: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Task', TaskSchema);
