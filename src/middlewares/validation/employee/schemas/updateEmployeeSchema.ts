import Joi from 'joi';

interface UpdateEmployeeInput {
  name?: string;
  phone?: string;
  email?: string;
  isManager?: boolean;
}

export default Joi.object<UpdateEmployeeInput>()
  .keys({
    name: Joi.string()
      .optional()
      .error(() => "Name can't be empty"),
    phone: Joi.string().min(10).max(10).optional(),
    email: Joi.string().email().optional(),
    isManager: Joi.boolean().optional(),
  })
  .options({ allowUnknown: false });
