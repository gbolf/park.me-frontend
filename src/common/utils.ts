import { TextFieldProps } from '@mui/material';
import { FormikProps } from 'formik';

export const formatNumber = (number: number) =>
  Intl.NumberFormat('hr-HR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);

export const getValueFromPath = (values: any, path: string) => {
  if (typeof values !== 'object' || values === null || typeof path !== 'string' || !path) {
    return undefined;
  }
  return path.match(/[^.[\]]+/g)?.reduce((obj, key) => obj?.[key], values);
};

export const createGetProps = <T>(formik: FormikProps<T>): ((name: string, label: string, placeholder?: string) => TextFieldProps) => {
  return (name, label, placeholder = '') => {
    const errorMsg = getValueFromPath(formik.errors, name);
    const isTouched = getValueFromPath(formik.touched, name);
    return {
      name,
      value: getValueFromPath(formik.values, name),
      error: isTouched && !!errorMsg,
      helperText: (isTouched && errorMsg) || '',
      onChange: formik.handleChange,
      fullWidth: true,
      label,
      placeholder,
      disabled: formik.isSubmitting,
    };
  };
};

const flatErrors = (errors: Record<string, any>, prefix = ''): string[] => {
  let response: string[] = [];

  Object.entries(errors).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      response.push(newKey);
    } else if (typeof value === 'object' && value !== null) {
      response = response.concat(flatErrors(value, newKey));
    }
  });

  return response;
};

export const validateCurrentStep = async (formik: FormikProps<any>, getFieldsForStep: (idx: number) => string[]) => {
  const step = formik.values.step;
  const fieldsToValidate = getFieldsForStep(step);

  const errors = flatErrors(await formik.validateForm());

  const stepErrors = errors.filter((key) => fieldsToValidate.includes(key) || fieldsToValidate.some((field) => key.startsWith(field)));

  if (stepErrors.length > 0) {
    stepErrors.forEach((key) => formik.setFieldTouched(key, true));
    return false;
  }

  return true;
};
