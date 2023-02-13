import Joi from 'joi';

interface UpdateTaskInput {
  title?: string;
  details?: string;
  deadline?: number;
  employee?: string;
}

export default Joi.object<UpdateTaskInput>()
  .keys({
    title: Joi.string().optional(),
    details: Joi.string().optional(),
    deadline: Joi.number().optional(),
    employee: Joi.string().optional(),
  })
  .options({ allowUnknown: false });
