import Joi from 'joi';
import { TaskInput } from './../../../../database/models/task.model';

export default Joi.object<TaskInput>()
  .keys({
    title: Joi.string().required(),
    details: Joi.string().required(),
    deadline: Joi.number().required(),
    employee: Joi.string().required(),
  })
  .options({ allowUnknown: false });
