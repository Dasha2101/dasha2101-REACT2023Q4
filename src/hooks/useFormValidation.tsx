import * as yup from 'yup';
import validationSchema from './useYup';

export const validateForms = (formValues: {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
  gender: string;
  country: string;
}) => {
  try {
    validationSchema.validateSync(formValues, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const formErrors: Record<string, string> = {};
      err.inner.forEach((error) => {
        formErrors[error.path!] = error.message;
      });
      return { isValid: false, errors: formErrors };
    }
    return { isValid: false, errors: {} };
  }
};
