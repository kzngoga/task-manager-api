import Joi from 'joi';
import { EmployeeInput } from '../../../../database/models/employee.model';

export default Joi.object<EmployeeInput>()
  .keys({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(10).required(),
    email: Joi.string().email().required(),
    isManager: Joi.boolean().required(),
  })
  .options({ allowUnknown: false });
